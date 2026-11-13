// Builds the clickable prototype for the Magebit Portal artifact library (docs/portal.json has the id).
//
// A Portal artifact holds at most 300 files (64MB) per version, blocks eval and inline handlers, starts
// localStorage empty on every page and never submits forms. So, on top of the normal build:
// - The generated listing pages (one per instrument type, per specialty and overall: ~300) stay on
//   GitHub Pages; links to them open there in a new tab. Everything else is in the artifact.
// - Alpine is its CSP build. The few page expressions that build can't parse are rewritten here
//   (statement lists, arrow functions, template literals, a regex, an object getter, globals), and
//   scripts/portal/runtime.js supplies the helpers they call, form submits and cross-page storage.
// - The pages' scripts and the shared catalog data are one deferred file, assets/js/site.js, and
//   links are relative to each page, naming index.html.
// The GitHub Pages build and the claude.ai artifact build are unchanged.
//
// Usage: node scripts/build-portal.mjs [output folder, default _portal]
// Then from that folder: run artifact-upload's command, and artifact-publish with its upload_id.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "_portal");
const here = path.dirname(new URL(import.meta.url).pathname);
const MARK = "/__AB__";
const LIVE = "https://santa-magebit.github.io/ambler-review-n661rv";
const MAX_FILES = 300;
const VENDORED = 19; // Google Fonts: the Roboto stylesheet and its 18 font files, copied in by the Portal

// Listing pages left on GitHub Pages; KEEP brings single ones into the artifact as samples.
const DROP = /^\/(?:browse-by-specialty\/[^/]+\/instruments\/[^/]+|browse-by-type\/[^/]+)\/$/;
const KEEP = ["/browse-by-type/forceps/", "/browse-by-specialty/ophthalmology/instruments/forceps/"];
const dropped = (p) => DROP.test(p) && !KEEP.includes(p);

fs.rmSync(out, { recursive: true, force: true });
execFileSync("npx", ["@11ty/eleventy", `--output=${out}`, "--quiet"], { env: { ...process.env, BASE_PATH: MARK }, stdio: "inherit" });
fs.rmSync(path.join(out, "robots.txt"), { force: true });

const files = (dir) => fs.readdirSync(dir, { recursive: true }).map((f) => path.join(dir, f)).filter((f) => fs.statSync(f).isFile());
const sitePath = (file) => "/" + path.relative(out, path.dirname(file)).split(path.sep).filter(Boolean).map((s) => s + "/").join("");

// Drop the listing pages (and the folders they leave empty).
let droppedPages = 0;
for (const file of files(out).filter((f) => f.endsWith("index.html") && dropped(sitePath(f)))) {
  fs.rmSync(file);
  droppedPages++;
}
for (const dir of fs.readdirSync(out, { recursive: true }).map((d) => path.join(out, d)).sort((a, b) => b.length - a.length)) {
  if (fs.statSync(dir).isDirectory() && !fs.readdirSync(dir).length) fs.rmdirSync(dir);
}

// "/__AB__/browse-by-type/?x" → "../../browse-by-type/index.html?x" from a page two folders down,
// or the GitHub Pages address of a page that isn't in the artifact.
const link = (up, p = "/") => {
  const [, file, rest] = p.match(/^([^?#]*)(.*)$/);
  if (dropped(file)) return LIVE + p;
  return up + file.slice(1) + (file.endsWith("/") ? "index.html" : "") + rest;
};

// Alpine expressions the CSP build can't parse, rewritten into ones it can.
const EXACT = new Map([
  ["setTimeout(() => [...document.querySelectorAll('header input[name=q]')].find((i) => i.offsetParent)?.focus())", "focusSearch()"],
  ["{ q: (new URLSearchParams(location.search).get('q') || '').trim() }", "{ q: queryParam('q') }"],
  ["{ open: false, get sheet() { return this.open && window.innerWidth < 768 } }", "portalAccountNav"],
]);
const used = new Set();
/** Split on top-level ";" (outside strings and brackets). */
const statements = (s) => {
  const parts = [];
  let depth = 0, quote = null, start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote) { if (c === "\\") i++; else if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"' || c === "`") quote = c;
    else if ("([{".includes(c)) depth++;
    else if (")]}".includes(c)) depth--;
    else if (c === ";" && depth === 0) { parts.push(s.slice(start, i)); start = i + 1; }
  }
  parts.push(s.slice(start));
  return parts.map((p) => p.trim()).filter(Boolean);
};
const rewrite = (name, expr) => {
  let e = expr.trim();
  if (EXACT.has(e)) { used.add(e); return EXACT.get(e); }
  // qtyStepper: (v => qty = v)(Math.max(1, parseInt($event.target.value.replace(/\D/g, '')) || 1))
  e = e.replaceAll("$event.target.value.replace(/\\D/g, '')", "digits($event.target.value)");
  const iife = e.match(/^\((\w+) => (.*?)\)\((.*)\)$/);
  if (iife) e = iife[2].replace(new RegExp(`\\b${iife[1]}\\b`, "g"), `(${iife[3]})`);
  // `left: ${a}%` → 'left: ' + (a) + '%'
  const tpl = e.match(/^`([^`]*)`$/);
  if (tpl) e = tpl[1].split(/\$\{([^}]*)\}/).map((part, i) => (i % 2 ? `(${part})` : `'${part.replace(/'/g, "\\'")}'`)).filter((p) => p !== "''").join(" + ");
  // a; b → [a, b] (the CSP build evaluates one expression; array items run in order)
  if (/^(@|x-on:|x-init$|x-effect$)/.test(name)) {
    const list = statements(e);
    if (list.length > 1) e = `[${list.join(", ")}]`;
  }
  return e;
};
const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const encode = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const NOT_EXPR = /^(x-cloak|x-ref|x-ignore|x-teleport|x-transition.*|x-collapse.*)$/;
const attrRe = /(\s)(x-[\w:.-]+|@[\w.:-]+|:[\w.-]+)="([^"]*)"/g;

// The CSP build's own parser, to check every expression before publishing.
const csp = fs.readFileSync(path.join(here, "portal/vendor/alpine-csp.js"), "utf8");
const { Tokenizer, Parser } = new Function(`${csp.slice(csp.indexOf("// packages/csp/src/parser.js"), csp.indexOf("function generateRuntimeFunction"))}\nreturn { Tokenizer, Parser };`)();
const problems = new Map();
const check = (name, expr, file) => {
  if (NOT_EXPR.test(name) || !expr.trim()) return;
  const e = name === "x-for" ? expr.split(/\s+(?:in|of)\s+/).pop() : expr;
  try { new Parser(new Tokenizer(e).tokenize()).parse(); }
  catch (err) { if (!problems.has(e)) problems.set(e, `${path.relative(out, file)} ${name}: ${err.message}`); }
};

// The head's inline data script, the same on every page, moves into site.js.
const inlineRe = /\s*<script>\s*(window\.BASE = [\s\S]*?)<\/script>/;
const scriptsRe = /(\s*<script (?:defer(?:="")? )?src="\/__AB__\/assets\/js\/[\w./-]+"><\/script>)+/;
const ORDER = ["app.js", "content.js", "plp.js", "pdp-cart.js", "checkout.js", "account.js", "vendor/alpine-collapse.min.js", "vendor/alpine-focus.min.js", "vendor/alpine.min.js"];
// Icons: a sandboxed Portal frame can't use symbols from another file (assets/icons.svg#id), so
// every page carries the symbols it uses and points at them by #id.
const spritePath = path.join(out, "assets/icons.svg");
const symbols = new Map([...fs.readFileSync(spritePath, "utf8").matchAll(/<symbol\b[^>]*\bid="([^"]+)"[\s\S]*?<\/symbol>/g)].map((m) => [m[1], m[0]]));
fs.rmSync(spritePath);
const useRe = /<use href="(?:\.\/|(?:\.\.\/)+)assets\/icons\.svg#([\w-]+)">/g;

let data = null;
const pages = files(out).filter((f) => f.endsWith(".html"));
for (const file of pages) {
  const depth = path.relative(out, file).split(path.sep).length - 1;
  const up = depth ? "../".repeat(depth) : "./";
  let html = fs.readFileSync(file, "utf8");

  const inline = html.match(inlineRe);
  if (!inline) throw new Error(`${file}: no inline data script`);
  if (data === null) data = inline[1];
  else if (inline[1] !== data) throw new Error(`${file}: the inline data script differs from the first page's`);
  const tags = html.match(scriptsRe);
  if (!tags || ORDER.some((s) => !tags[0].includes(`/assets/js/${s}"`))) throw new Error(`${file}: script tags changed, update build-portal.mjs`);
  html = html.replace(inlineRe, "").replace(scriptsRe, `\n  <script defer src="${up}assets/js/site.js"></script>`);
  if (/<script(?![^>]*\b(?:src=|type="application\/(?:ld\+)?json"))/.test(html)) throw new Error(`${file}: an inline script is left`);

  const body = '<body class="flex min-h-screen flex-col" x-data="" x-effect=';
  if (!html.includes(body)) throw new Error(`${file}: body x-data changed`);
  html = html.replace(body, body.replace('x-data=""', 'x-data="portalGlobals"'));

  html = html.replace(attrRe, (m, sp, name, raw) => {
    if (NOT_EXPR.test(name) || !raw.trim()) return m;
    const expr = decode(raw);
    const next = rewrite(name, expr);
    check(name, next, file);
    return next === expr ? m : `${sp}${name}="${encode(next)}"`;
  });

  // Paths: images (also inside JSON, after an escaped &quot;) and every site path.
  html = html.replace(/(?<=["'(\s,=;])\/img\/(?=(?:[\w-]+\/)?[\w.-]+\.(?:png|jpe?g|webp|gif|svg))/g, `${MARK}/img/`);
  html = html.replace(new RegExp(`${MARK}(/[^"'\\s)<>&]*)?`, "g"), (m, p) => link(up, p));
  if (html.includes(MARK)) throw new Error(`${file}: ${MARK} left over`);
  const ids = new Set();
  html = html.replace(useRe, (m, id) => {
    if (!symbols.has(id)) throw new Error(`${file}: no icon ${id} in assets/icons.svg`);
    ids.add(id);
    return `<use href="#${id}">`;
  });
  if (html.includes("icons.svg")) throw new Error(`${file}: an icons.svg reference is left`);
  const sprite = ids.size ? `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs>${[...ids].map((id) => symbols.get(id)).join("")}</defs></svg>` : "";
  // The Portal's host (Cloudflare) rewrites e-mail addresses into "[email protected]" unless told not to.
  html = html.replace(/(<body[^>]*>)/, `$1<!--email_off-->${sprite}`).replace("</body>", "<!--/email_off--></body>");
  if (path.relative(out, file) === "index.html") html = html.replace(/<title>[^<]*<\/title>/, "<title>Ambler Surgical Prototype</title>");
  fs.writeFileSync(file, html);
}
for (const e of EXACT.keys()) if (!used.has(e)) throw new Error(`No page has the expression ${e}: update build-portal.mjs`);
if (problems.size) {
  console.error(`${problems.size} Alpine expressions the CSP build can't parse:`);
  for (const [e, where] of problems) console.error(`  ${where}\n    ${e.slice(0, 200)}`);
  process.exit(1);
}

// site.js: where the site sits, the shared data, the Portal runtime, the page scripts, then Alpine.
const js = (f) => fs.readFileSync(path.join(out, "assets/js", f), "utf8");
const urlDef = `window.url = (p) => (typeof p === "string" && p.startsWith("/") ? BASE + p : p);`;
let app = js("app.js");
if (!app.includes(urlDef)) throw new Error("app.js: url() changed, update build-portal.mjs");
app = app.replace(urlDef, `window.url = (p) => {
    if (typeof p !== "string" || !p.startsWith("/")) return p;
    const [, file, rest] = p.match(/^([^?#]*)(.*)$/);
    if (${DROP}.test(file) && !${JSON.stringify(KEEP)}.includes(file)) return ${JSON.stringify(LIVE)} + p;
    return BASE + file + (file.endsWith("/") ? "index.html" : "") + rest;
  };`);
if (!data.startsWith(`window.BASE = "${MARK}";`)) throw new Error("inline data: window.BASE moved, update build-portal.mjs");
const bundle = [
  "/* Ambler Surgical prototype, Magebit Portal copy (scripts/build-portal.mjs). */",
  `window.BASE = (() => {
  const s = document.currentScript;
  try { return new URL("../../", s.src).pathname.replace(/\\/$/, ""); } catch { /* no script URL: from the page's */ }
  try { return new URL(s.getAttribute("src").replace(/assets\\/js\\/site\\.js$/, "") || "./", location.href).pathname.replace(/\\/$/, ""); } catch { return ""; }
})();`,
  data.replace(`window.BASE = "${MARK}";`, "").trim().replaceAll(`"${MARK}/`, '"/'),
  fs.readFileSync(path.join(here, "portal/runtime.js"), "utf8"),
  app,
  ...ORDER.slice(1, -1).map(js),
  fs.readFileSync(path.join(here, "portal/vendor/alpine-csp.min.js"), "utf8"),
].join("\n;\n");
if (bundle.includes(MARK)) throw new Error(`site.js: ${MARK} left over`);
fs.rmSync(path.join(out, "assets/js"), { recursive: true });
fs.mkdirSync(path.join(out, "assets/js"));
fs.writeFileSync(path.join(out, "assets/js/site.js"), bundle);

// Only the images some page, the CSS or the data still uses.
const text = files(out).filter((f) => /\.(html|css|js|svg)$/.test(f) && !f.includes(`${path.sep}img${path.sep}`)).map((f) => fs.readFileSync(f, "utf8")).join("\n");
let unused = 0;
for (const f of files(path.join(out, "img"))) {
  const rel = path.relative(path.join(out, "img"), f).split(path.sep).join("/");
  if (!text.includes(`img/${rel}`)) { fs.rmSync(f); unused++; }
}

const all = files(out);
const bytes = all.reduce((s, f) => s + fs.statSync(f).size, 0);
const count = (re) => all.filter((f) => re.test(path.relative(out, f))).length;
console.log(`${all.length} files (+${VENDORED} font files the Portal adds = ${all.length + VENDORED} of ${MAX_FILES}), ${(bytes / 1e6).toFixed(1)}MB in ${out}`);
console.log(`  ${count(/\.html$/)} pages (${droppedPages} listing pages left on GitHub Pages), ${count(/^img\//)} images (${unused} unused left out), ${count(/^assets\//)} assets`);
if (all.length + VENDORED > MAX_FILES) { console.error("Too many files for one Portal version."); process.exit(1); }
