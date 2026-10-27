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

  /**
   * Carousel arrows: move by half the cards in view, rounded up (3 of 5, 2 of 4 or 3, 1 on phones),
   * so a couple of cards stay on screen as an anchor. scrollBy stops at either end and the track's
   * snap-start lands on a card edge.
   */
  window.carouselStep = (track, dir) => {
    const card = track.querySelector("li");
    if (!card) return;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap) || 0;
    const pitch = card.offsetWidth + gap;
    const inner = track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const visible = Math.max(1, Math.floor((inner + gap + 1) / pitch));
    track.scrollBy({ left: dir * Math.ceil(visible / 2) * pitch, behavior: "smooth" });
  };

  /**
   * Page scroll lock for drawers and modals: x-effect="lockScroll('minicart', $store.cart.open)".
   * The page scrollbar stays on screen, so nothing jumps sideways when a panel opens. While any lock
   * is on, wheel, touch and scroll keys outside the open dialog do nothing, scrolling inside it still
   * works, and a scroll from dragging the page scrollbar snaps straight back.
   */
  const locks = new Set();
  let lockedY = 0;
  window.lockScroll = (key, on) => {
    if (on && !locks.size) lockedY = window.scrollY;
    on ? locks.add(key) : locks.delete(key);
  };
  const dialogOf = (el) => (el && el.closest ? el.closest('[aria-modal="true"]') : null);
  /** Can something between el and the dialog scroll further in direction dy (0 = either way)? */
  const canScroll = (el, dialog, dy) => {
    for (let n = el; n && n !== dialog.parentElement; n = n.parentElement) {
      if (!/(auto|scroll)/.test(getComputedStyle(n).overflowY) || n.scrollHeight <= n.clientHeight + 1) continue;
      if (dy === 0 || (dy < 0 ? n.scrollTop > 0 : n.scrollTop + n.clientHeight < n.scrollHeight - 1)) return true;
    }
    return false;
  };
  const blockScroll = (e, dy) => {
    if (!locks.size) return;
    const dialog = dialogOf(e.target);
    if (!dialog || !canScroll(e.target, dialog, dy)) e.preventDefault();
  };
  window.addEventListener("wheel", (e) => blockScroll(e, e.deltaY), { passive: false });
  window.addEventListener("touchmove", (e) => blockScroll(e, 0), { passive: false });
  const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
  window.addEventListener("keydown", (e) => {
    if (locks.size && SCROLL_KEYS.has(e.key) && !dialogOf(e.target) && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) e.preventDefault();
  });
  window.addEventListener("scroll", () => {
    if (locks.size && window.scrollY !== lockedY) window.scrollTo({ top: lockedY, behavior: "instant" });
  }, { passive: true });

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

    /**
     * Fake sign-in. Visitors start signed in as the test account (site.testAccount, window.TEST_ACCOUNT);
     * Sign Out and Sign In switch it and localStorage keeps the choice. The header menu, checkout and
     * Quick Order read it.
     */
    Alpine.store("auth", {
      loggedIn: read("ambler-proto-auth", true),
      /** Login form check: the test account's e-mail (any case) and password. */
      matches(email, password) {
        const account = window.TEST_ACCOUNT || {};
        return String(email || "").trim().toLowerCase() === account.email && password === account.password;
      },
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

    /**
     * Mega menu specialty rail with "menu aim" (the safe-triangle pattern of jQuery-menu-aim): while
     * the pointer heads from the open specialty towards its panel, crossing other specialties does
     * not switch the panel. Switching waits (DELAY) and happens only once the pointer stops on a
     * specialty or moves away from the panel. Keyboard focus switches straight away.
     * Markup: x-ref="rail" on the rail column, @mousemove="track($event)", @mouseenter="aim(slug)".
     */
    Alpine.data("megaMenu", (first) => {
      const DELAY = 300; // ms to wait while the pointer may be heading for the panel
      const TOLERANCE = 75; // px the triangle reaches above and below the panel
      const slope = (a, b) => (b.y - a.y) / (b.x - a.x);
      return {
        active: first,
        locs: [],
        lastMove: 0,
        lastDelayLoc: null,
        timer: null,
        track(e) {
          this.locs.push({ x: e.clientX, y: e.clientY });
          if (this.locs.length > 3) this.locs.shift();
          this.lastMove = performance.now();
        },
        /** ms to wait before switching: > 0 while the pointer moves inside the triangle towards the panel. */
        delay() {
          const r = this.$refs.rail.getBoundingClientRect();
          const loc = this.locs[this.locs.length - 1];
          const prev = this.locs[0] || loc;
          if (!loc || prev.x < r.left || prev.x > r.right || prev.y < r.top || prev.y > r.bottom) return 0;
          if (this.lastDelayLoc && loc.x === this.lastDelayLoc.x && loc.y === this.lastDelayLoc.y) return 0;
          if (performance.now() - this.lastMove > 100) return 0; // the pointer has stopped
          // The panel starts at the rail's right edge: the triangle runs from the pointer to its two corners.
          const upper = { x: r.right, y: r.top - TOLERANCE };
          const lower = { x: r.right, y: r.bottom + TOLERANCE };
          if (slope(loc, upper) < slope(prev, upper) && slope(loc, lower) > slope(prev, lower)) {
            this.lastDelayLoc = loc;
            return DELAY;
          }
          this.lastDelayLoc = null;
          return 0;
        },
        aim(slug) {
          clearTimeout(this.timer);
          const wait = this.delay();
          if (wait) this.timer = setTimeout(() => this.aim(slug), wait);
          else this.active = slug;
        },
        cancel() {
          clearTimeout(this.timer);
        },
      };
    });

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
