/*
 * Shared Alpine.js code for the prototype: helpers, stores and header components.
 * Page areas register their own components in content.js, plp.js, pdp-cart.js,
 * checkout.js and account.js (all loaded before Alpine starts).
 *
 * Hyvä mapping: Alpine.store("cart") stands in for the customer-data cart
 * section; window.dispatchEvent(new CustomEvent("proto-toast")) for messages.
 */
(() => {
  const BASE = window.BASE || "";
  const CATALOG = window.CATALOG || [];

  /** Prefix a site path with the base path (GitHub Pages sub-folder). */
  window.url = (p) => (typeof p === "string" && p.startsWith("/") ? BASE + p : p);
  window.money = (n) => Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });
  /** toast({ message, href?, linkLabel? }) */
  window.toast = (detail) => window.dispatchEvent(new CustomEvent("proto-toast", { detail }));

  const bySlug = Object.fromEntries(CATALOG.map((p) => [p.slug, p]));
  window.findProduct = (slug) => bySlug[slug];
  window.findBySku = (sku) => {
    const s = String(sku || "").trim().toLowerCase();
    return CATALOG.find((p) => p.sku && p.sku.toLowerCase() === s);
  };

  const read = (k, fallback) => {
    try {
      const raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const write = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage blocked: state lives for this page only */
    }
  };

  document.addEventListener("alpine:init", () => {
    const Alpine = window.Alpine;

    /** Prototype cart, persisted in localStorage. add() opens the mini cart ("Mini Cart - Added"). */
    Alpine.store("cart", {
      lines: read("ambler-proto-cart", []),
      open: false,
      lastAdded: null,
      get items() {
        return this.lines.map((l) => ({ ...l, product: bySlug[l.slug] })).filter((i) => i.product);
      },
      get count() {
        return this.items.reduce((n, i) => n + i.qty, 0);
      },
      get subtotal() {
        return this.items.reduce((n, i) => n + i.qty * i.product.price, 0);
      },
      save() {
        write("ambler-proto-cart", this.lines);
      },
      add(slug, qty = 1, { open = true } = {}) {
        qty = Math.max(1, parseInt(qty, 10) || 1);
        const hit = this.lines.find((l) => l.slug === slug);
        this.lines = hit
          ? [{ slug, qty: hit.qty + qty }, ...this.lines.filter((l) => l.slug !== slug)]
          : [{ slug, qty }, ...this.lines];
        this.save();
        this.lastAdded = slug;
        if (open) this.open = true;
      },
      setQty(slug, qty) {
        this.lines = this.lines.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, parseInt(qty, 10) || 1) } : l));
        this.save();
      },
      remove(slug) {
        this.lines = this.lines.filter((l) => l.slug !== slug);
        this.save();
      },
      clear() {
        this.lines = [];
        this.save();
      },
      close() {
        this.open = false;
        this.lastAdded = null;
      },
    });

    // Review helper: any page opened with ?demo-cart starts with the three products
    // drawn in the Figma cart (14205, BCD-10, 2084E), so cart pages can be linked directly.
    if (new URLSearchParams(location.search).has("demo-cart")) {
      const cart = Alpine.store("cart");
      cart.lines = ["14205", "BCD-10", "2084E"].map((sku) => ({ slug: findBySku(sku)?.slug, qty: 1 })).filter((l) => l.slug);
      cart.save();
    }

    /** Fake sign-in flag. Sign in / create account set it; the header menu and checkout read it. */
    Alpine.store("auth", {
      loggedIn: read("ambler-proto-auth", false),
      signIn() {
        this.loggedIn = true;
        write("ambler-proto-auth", true);
      },
      signOut() {
        this.loggedIn = false;
        write("ambler-proto-auth", false);
      },
    });

    Alpine.data("siteHeader", () => ({
      menu: null,
      drawer: false,
      init() {
        // Expose the sticky header's height as --header-h so anchors and sticky
        // elements (About sub-nav, PDP gallery) sit below it. 0 when not sticky.
        const root = document.documentElement;
        const update = () => {
          const sticky = getComputedStyle(this.$el).position === "sticky";
          const h = sticky ? this.$el.offsetHeight : 0;
          root.style.setProperty("--header-h", `${h}px`);
          root.style.scrollPaddingTop = `${h}px`;
        };
        update();
        new ResizeObserver(update).observe(this.$el);
        window.addEventListener("resize", update);
      },
      toggle(name) {
        this.menu = this.menu === name ? null : name;
      },
    }));

    Alpine.data("searchBox", () => ({
      q: "",
      open: false,
      get needle() {
        return this.q.trim().toLowerCase();
      },
      /** The three products drawn in the Figma dropdown (no item numbers). */
      get recent() {
        return CATALOG.filter((p) => !p.sku);
      },
      get hits() {
        const n = this.needle;
        if (!n) return [];
        return CATALOG.filter((p) => [p.name, p.sku || "", p.description, p.typeName].some((v) => v.toLowerCase().includes(n))).slice(0, 3);
      },
      go(term) {
        this.open = false;
        window.location.href = url(`/search/?q=${encodeURIComponent(String(term).trim())}`);
      },
    }));

    Alpine.data("toaster", () => ({
      t: null,
      timer: null,
      init() {
        const show = (d) => {
          this.t = d;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => (this.t = null), 4000);
        };
        window.addEventListener("proto-toast", (e) => show(e.detail));
        // Anything not designed in Figma is marked data-proto.
        document.addEventListener("click", (e) => {
          const el = e.target.closest("[data-proto]");
          if (!el) return;
          e.preventDefault();
          show({ message: "This isn't part of the prototype yet." });
        });
      },
    }));
  });
})();
