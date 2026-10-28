import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { execFileSync } from "node:child_process";
import path from "node:path";
import icons from "./src/_data/icons.js";
import images from "./src/_data/images.js";

// BASE_PATH lets the same build run at the site root (local) and in a
// sub-folder (GitHub Pages). Absolute URLs in HTML (href, src) are rewritten
// by the HTML base plugin; scripts read window.BASE.
const base = (process.env.BASE_PATH || "").replace(/\/$/, "");

// Page folders per area. ONLY=<area> builds just that area (plus 404), so
// parallel work on one area cannot break another area's build.
const areas = {
  content: ["src/index.njk", "src/about-ambler-surgical/**", "src/repair-services/**", "src/free-lifetime-repair/**", "src/sterilization-cleaning/**", "src/contact/**"],
  plp: ["src/browse-by-specialty/**", "src/browse-by-type/**", "src/product-lines/**", "src/search/**"],
  "pdp-cart": ["src/product/**", "src/checkout/cart/**", "src/quick-order/**"],
  checkout: ["src/checkout/index.njk", "src/checkout/onepage/**"],
  account: ["src/customer/**", "src/sales/**", "src/giftcard/**", "src/vault/**", "src/privacy-settings/**"],
};

export default function (config) {
  const only = process.env.ONLY;
  if (only) {
    if (!areas[only]) throw new Error(`ONLY must be one of ${Object.keys(areas).join(", ")}`);
    for (const [area, globs] of Object.entries(areas)) if (area !== only) globs.forEach((g) => config.ignores.add(g));
  }

  config.addPlugin(EleventyHtmlBasePlugin);
  config.addGlobalData("base", base);

  config.addPassthroughCopy({ "src/img": "img" });
  config.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  config.addPassthroughCopy({ "src/assets/js": "assets/js" });
  config.addPassthroughCopy({
    "node_modules/alpinejs/dist/cdn.min.js": "assets/js/vendor/alpine.min.js",
    "node_modules/@alpinejs/collapse/dist/cdn.min.js": "assets/js/vendor/alpine-collapse.min.js",
    "node_modules/@alpinejs/focus/dist/cdn.min.js": "assets/js/vendor/alpine-focus.min.js",
  });
  config.addWatchTarget("src/assets/css/");
  config.addWatchTarget("tailwind.config.js");

  // {% icon "search", "h-7 w-7" %}: a Figma icon layer from the sprite /assets/icons.svg
  // (built from src/_data/icons.js by src/assets/icons.svg.njk). Colour = currentColor.
  config.addShortcode("icon", (name, cls = "h-7 w-7", attrs = "") => {
    const i = icons[name];
    if (!i) throw new Error(`Unknown icon "${name}"`);
    return `<svg viewBox="${i.viewBox}" fill="none" class="shrink-0 ${cls}" aria-hidden="true" ${attrs}><use href="${base}/assets/icons.svg#${name}"></use></svg>`;
  });

  // {{ "c19e9704" | img }} → /img/c19e9704.jpg (a Figma image fill by hash8).
  config.addFilter("img", (key) => {
    if (typeof key === "string" && key.startsWith("/")) return key;
    const p = images[key];
    if (!p) throw new Error(`Unknown image "${key}"`);
    return p;
  });

  config.addFilter("money", (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" }));
  config.addFilter("json", (v) => JSON.stringify(v));
  config.addFilter("find", (arr, key, value) => (arr || []).find((x) => x[key] === value));
  config.addFilter("where", (arr, key, value) => (arr || []).filter((x) => (Array.isArray(x[key]) ? x[key].includes(value) : x[key] === value)));

  // Compile Tailwind after every build into the output folder.
  // `directories.output` honours --output; `dir.output` is the config default.
  config.on("eleventy.after", ({ dir, directories }) => {
    const out = path.join(directories?.output ?? dir.output, "assets/css/app.css");
    execFileSync(path.resolve("node_modules/.bin/tailwindcss"), ["-i", "src/assets/css/app.css", "-o", out, "--minify"], { stdio: "pipe" });
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: base ? `${base}/` : "/",
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
