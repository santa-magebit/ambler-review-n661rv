/*
 * Magebit Portal runtime (scripts/build-portal.mjs adds it to the Portal copy only).
 *
 * The Portal frame differs from GitHub Pages in three ways this file makes up for:
 * - Alpine runs as its CSP build: expressions are parsed, not eval'd, and can only reach names in
 *   Alpine scope. Browser globals (window, location, Math, parseInt…) are off limits, so the body's
 *   x-data="portalGlobals" hands the pages stand-ins for the ones they use.
 * - Forms never submit and their submit event never fires. Clicks on submit buttons and Enter in
 *   a field send a submit event themselves; a form nobody handles goes to its action (GET).
 * - localStorage and sessionStorage start empty on every page. The frame's window.name survives
 *   moving between pages, so both are carried over in it (cart, sign-in, the next page's toast).
 */
(() => {
  const W = window;

  // Storage: restored before the site scripts read it, saved whenever the page is left.
  const NAME = "ambler-portal:";
  const stores = () => {
    const out = [];
    for (const [k, get] of [["l", () => W.localStorage], ["s", () => W.sessionStorage]]) {
      try { const s = get(); if (s) out.push([k, s]); } catch { /* storage blocked: nothing to carry */ }
    }
    return out;
  };
  try {
    if (W.name.startsWith(NAME)) {
      const saved = JSON.parse(W.name.slice(NAME.length));
      for (const [k, s] of stores()) for (const [key, v] of Object.entries(saved[k] || {})) if (s.getItem(key) === null) s.setItem(key, v);
    }
  } catch { /* a foreign window.name: ignore */ }
  const save = () => {
    try {
      const o = {};
      for (const [k, s] of stores()) {
        o[k] = {};
        for (let i = 0; i < s.length; i++) { const key = s.key(i); o[k][key] = s.getItem(key); }
      }
      W.name = NAME + JSON.stringify(o);
    } catch { /* keep the old copy */ }
  };
  W.addEventListener("pagehide", save);
  W.addEventListener("beforeunload", save);
  document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest("a[href]")) save(); }, true);

  // Forms.
  const isSubmitType = (b) =>
    b.tagName === "BUTTON" ? (b.getAttribute("type") || "submit").toLowerCase() === "submit" : b.tagName === "INPUT" && /^(submit|image)$/.test(b.type);
  const isSubmitButton = (b) => b && b.form && !b.disabled && isSubmitType(b);
  const submit = (form, submitter) => {
    if (!form.noValidate && !(submitter && submitter.formNoValidate) && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    let ev;
    try { ev = new SubmitEvent("submit", { bubbles: true, cancelable: true, submitter: submitter || null }); }
    catch { ev = new Event("submit", { bubbles: true, cancelable: true }); }
    if (!form.dispatchEvent(ev)) return;
    const method = ((submitter && submitter.getAttribute("formmethod")) || form.getAttribute("method") || "get").toLowerCase();
    if (method === "dialog") return;
    const target = new URL((submitter && submitter.getAttribute("formaction")) ? submitter.formAction : form.action, W.location.href);
    if (method === "get") target.search = new URLSearchParams(submitter ? new FormData(form, submitter) : new FormData(form)).toString();
    save();
    W.location.href = target.href;
  };
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    const b = e.target.closest && e.target.closest("button, input[type=submit], input[type=image]");
    if (!isSubmitButton(b)) return;
    e.preventDefault();
    submit(b.form, b);
  });
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.key !== "Enter" || e.isComposing) return;
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || !t.form) return;
    if (/^(button|submit|reset|image|checkbox|radio|file|hidden|range|color)$/.test(t.type)) return;
    e.preventDefault();
    const first = [...t.form.elements].find(isSubmitType);
    if (first) { if (!first.disabled) first.click(); return; }
    submit(t.form, null);
  });

  // Stand-ins for the browser globals the page expressions use (the CSP build refuses the real ones).
  const loc = {
    get href() { return W.location.href; },
    set href(u) { save(); W.location.href = u; },
    get search() { return W.location.search; },
    get hash() { return W.location.hash; },
    replace(u) { save(); W.location.replace(u); },
  };
  const fn = (f) => (...a) => f(...a);
  document.addEventListener("alpine:init", () => {
    W.Alpine.data("portalGlobals", () => ({
      url: fn(W.url),
      money: fn(W.money),
      toast: fn(W.toast),
      lockScroll: fn(W.lockScroll),
      parseInt: (v, r) => parseInt(v, r),
      Math: { max: fn(Math.max), min: fn(Math.min), round: fn(Math.round), floor: fn(Math.floor), ceil: fn(Math.ceil), abs: fn(Math.abs) },
      get innerWidth() { return W.innerWidth; },
      get innerHeight() { return W.innerHeight; },
      get scrollY() { return W.scrollY; },
      print: () => W.print(),
      location: loc,
      history: { get length() { return W.history.length; }, back: () => W.history.back() },
      window: { location: loc, get innerWidth() { return W.innerWidth; }, print: () => W.print() },
      /** $event.target.value.replace(/\D/g, '') */
      digits: (v) => String(v == null ? "" : v).replace(/\D/g, ""),
      /** (new URLSearchParams(location.search).get(k) || '').trim() */
      queryParam: (k) => (new URLSearchParams(W.location.search).get(k) || "").trim(),
      /** 404 "search": focus the header search box that is on screen. */
      focusSearch: () => setTimeout(() => {
        const box = [...document.querySelectorAll("header input[name=q]")].find((i) => i.offsetParent);
        if (box) box.focus();
      }),
    }));
    // Account menu: x-data="{ open: false, get sheet() { … } }" (object getters don't parse in the CSP build).
    W.Alpine.data("portalAccountNav", () => ({
      open: false,
      get sheet() { return this.open && W.innerWidth < 768; },
    }));
  });
})();
