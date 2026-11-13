// Builds the prototype for its claude.ai artifact (docs/artifact.json has the link).
//
// An artifact serves its files under a path that changes with every publish
// (https://<id>.frame.claudeusercontent.com/_f/<version>/), holds at most 511
// files and takes at most 255 files / 64MB per publish. So, on top of the
// normal build:
// - Links are relative to each page and name index.html; window.BASE is worked
//   out in the browser, and url() adds index.html to folder paths.
// - Images live in the artifact's asset store (/_blob/<id>, ids in
//   docs/artifact.json), not among its files.
// - The catalog and search data sit in one shared script instead of every page.
//
// Usage: node scripts/build-artifact.mjs [output folder, default _artifact]
// Prints the images that still need uploading, or the publish batches.
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "_artifact");
const MARK = "/__AB__";
const statePath = path.resolve("docs/artifact.json");
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

fs.rmSync(out, { recursive: true, force: true });
execFileSync("npx", ["@11ty/eleventy", `--output=${out}`, "--quiet"], { env: { ...process.env, BASE_PATH: MARK }, stdio: "inherit" });
fs.rmSync(path.join(out, "robots.txt"), { force: true });

const files = (dir) => fs.readdirSync(dir, { recursive: true }).map((f) => path.join(dir, f)).filter((f) => fs.statSync(f).isFile());
const sha256 = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");

// Images: every file in img/ must be in the asset store with its current content.
const imgDir = path.join(out, "img");
const stale = files(imgDir).map((f) => path.relative(imgDir, f)).filter((f) => state.images[f]?.sha256 !== sha256(path.join(imgDir, f)));
if (stale.length) {
  console.log(`${stale.length} images to upload to ${state.url} (asset: true), then record their ids in docs/artifact.json:`);
  stale.forEach((f) => console.log(path.join(imgDir, f)));
  process.exit(2);
}
// Image paths sit in attributes, JSON and Alpine expressions (";" ends an escaped &quot;).
const imgRe = new RegExp(`(?<=["'(\\s,=;])(?:${MARK})?/img/((?:[\\w-]+/)?[\\w.-]+\\.(?:png|jpe?g|webp|gif|svg))`, "g");
const blobs = (text, file) => {
  const done = text.replace(imgRe, (m, f) => `/_blob/${state.images[f].id}`);
  if (/["'(\s,=;](?:\/__AB__)?\/img\//.test(done)) throw new Error(`${file}: an /img/ path left over`);
  return done;
};

// "/__AB__/browse-by-type/?x" → "../../browse-by-type/index.html?x" from a page two folders down.
const relative = (up, p = "/") => {
  const [, pathPart, rest] = p.match(/^([^?#]*)(.*)$/);
  return up + pathPart.slice(1) + (pathPart.endsWith("/") ? "index.html" : "") + rest;
};

// Shared data: the inline window.CATALOG / window.SEARCH lines of the home page.
const dataRe = /^\s*window\.(?:CATALOG|SEARCH) = .*;\n/gm;
const home = fs.readFileSync(path.join(out, "index.html"), "utf8");
const data = home.match(dataRe).map((l) => l.trim()).join("\n");
fs.writeFileSync(path.join(out, "assets/js/data.js"), `// Catalog and search data for every page (inline in the GitHub Pages build).\n${blobs(data, "data.js")}\n`);

for (const file of files(out).filter((f) => f.endsWith(".html"))) {
  const depth = path.relative(out, file).split(path.sep).length - 1;
  const up = depth ? "../".repeat(depth) : "./";
  let html = fs.readFileSync(file, "utf8");
  const own = (html.match(dataRe) || []).map((l) => l.trim()).join("\n");
  if (own && own !== data) throw new Error(`${file}: catalog or search data differs from the home page`);
  html = html
    .replace(dataRe, "")
    .replace(`<script src="${MARK}/assets/js/app.js">`, `<script src="${MARK}/assets/js/data.js"></script>\n  <script src="${MARK}/assets/js/app.js">`)
    .replace(`window.BASE = "${MARK}";`, `window.BASE = new URL("${up}", location.href).pathname.replace(/\\/$/, "");`);
  html = blobs(html, file).replace(new RegExp(`${MARK}(/[^"'\\s)<>]*)?`, "g"), (m, p) => relative(up, p));
  if (depth === 0) html = html.replace(/<title>[^<]*<\/title>/, "<title>Ambler Surgical Prototype</title>");
  if (html.includes(MARK)) throw new Error(`${file}: ${MARK} left over`);
  fs.writeFileSync(file, html);
}

const appJs = path.join(out, "assets/js/app.js");
const urlDef = `window.url = (p) => (typeof p === "string" && p.startsWith("/") ? BASE + p : p);`;
const app = fs.readFileSync(appJs, "utf8");
if (!app.includes(urlDef)) throw new Error("app.js: url() changed, update build-artifact.mjs");
fs.writeFileSync(appJs, app.replace(urlDef, `window.url = (p) => (typeof p === "string" && p.startsWith("/") && !p.startsWith("/_blob/") ? BASE + p.replace(/^([^?#]*\\/)(?=[?#]|$)/, "$1index.html") : p);`));

// The images are in the asset store; without img/ a local server shows what the artifact shows.
fs.rmSync(imgDir, { recursive: true });

// Publish batches: the home page is the artifact's page, the rest go up as files.
const rest = files(out)
  .filter((f) => path.relative(out, f) !== "index.html")
  .map((f) => ({ path: path.relative(out, f), size: fs.statSync(f).size }))
  .sort((a, b) => a.path.localeCompare(b.path));
const batches = [[]];
for (const f of rest) {
  const b = batches.at(-1);
  if (b.length >= 250 || b.reduce((s, x) => s + x.size, 0) + f.size > 60e6) batches.push([f]);
  else b.push(f);
}
fs.writeFileSync(path.join(out, "batches.json"), JSON.stringify(batches.map((b) => b.map((f) => f.path))));
console.log(`${rest.length + 1} files in ${out}; publish index.html with ${batches.length} batch(es) of files (batches.json):`);
batches.forEach((b, i) => console.log(`  ${i + 1}: ${b.length} files, ${(b.reduce((s, x) => s + x.size, 0) / 1e6).toFixed(1)}MB`));
