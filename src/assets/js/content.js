/*
 * Alpine components for the "content" pages (Home, About, Repair Services,
 * Sterilization, Contact). Registered before Alpine starts. Helpers from app.js:
 * url(), money(), toast(), findProduct(), findBySku().
 */
document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  /**
   * About sticky sub-navigation (Figma 34974:1154, scrolled state 34971:56681),
   * also the Conditions of Sale section bar (35098:39780).
   * Tabs are anchor links ([data-section] = section id); the tab of the section
   * under the bar gets the orange underline. The bar pins under the sticky site
   * header (top: var(--header-h)); sections use scroll-mt-[69px] for the bar and
   * the page's scroll-padding-top covers the header. Sections hidden by a search
   * (termsSearch) are skipped.
   */
  Alpine.data("aboutSubnav", () => ({
    active: null,
    ids: [],
    target: null,
    timer: null,
    frame: 0,
    init() {
      this.ids = [...this.$el.querySelectorAll("[data-section]")].map((a) => a.dataset.section);
      // The bar pins under the sticky site header via top: var(--header-h) (set in app.js).
      this.active = this.ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : this.ids[0];
      const onScroll = () => {
        if (!this.frame) this.frame = requestAnimationFrame(() => this.update());
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      this.$watch("active", () => this.reveal());
      this.update();
    },
    /** The last section whose top has passed the bar's bottom edge is active. */
    update() {
      this.frame = 0;
      if (this.target) return;
      const line = this.$el.getBoundingClientRect().bottom + 24;
      let current = this.ids.find((id) => document.getElementById(id)?.offsetParent) || this.ids[0];
      for (const id of this.ids) {
        const el = document.getElementById(id);
        if (el && el.offsetParent && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = document.getElementById(this.ids[this.ids.length - 1]);
        if (last && last.offsetParent && last.getBoundingClientRect().top < window.innerHeight) current = this.ids[this.ids.length - 1];
      }
      this.active = current;
    },
    /** Tab click: underline the target right away and hold it while the page scrolls there. */
    go(id) {
      this.active = id;
      this.target = id;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.target = null;
        this.update();
      }, 900);
    },
    /** Phones: keep the active tab visible in the horizontally scrolling tab row (20px page margin, mobile 34971:56818). */
    reveal() {
      const list = this.$refs.tabs;
      const tab = list && list.querySelector(`[data-section="${this.active}"]`);
      if (!tab || list.scrollWidth <= list.clientWidth) return;
      const left = tab.offsetLeft - list.offsetLeft;
      if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: Math.max(0, left - 20), behavior: "smooth" });
      }
    },
  }));

  /**
   * Horizontal card slider (About "Customer Testimonials" 34974:1295 + controls 34974:1323). x-ref="track".
   * Loops forward: next on the last card goes back to the first (previous stops at the first), and it moves on by
   * itself every 6s while on screen, unless the visitor is reading it (hover, focus, a touch in the last 10s) or
   * prefers reduced motion.
   */
  Alpine.data("slider", () => ({
    progress: 0,
    // Width of the progress line's thumb, in %: the share of the cards in view.
    thumb: 24.36,
    atStart: true,
    atEnd: false,
    hold: false,
    touchedAt: 0,
    inView: false,
    init() {
      this.update();
      window.addEventListener("resize", () => this.update());
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      new IntersectionObserver(([e]) => (this.inView = e.isIntersecting), { threshold: 0.4 }).observe(this.$el);
      setInterval(() => {
        if (this.inView && !this.hold && !document.hidden && Date.now() - this.touchedAt > 10000) this.step(1);
      }, 6000);
    },
    touched() {
      this.touchedAt = Date.now();
    },
    update() {
      const el = this.$refs.track;
      const max = el.scrollWidth - el.clientWidth;
      this.progress = max > 0 ? Math.min(1, el.scrollLeft / max) : 0;
      this.thumb = Math.max(10, Math.min(100, (el.clientWidth / el.scrollWidth) * 100));
      // Snapping can stop a couple of pixels short of either end, so allow a little slack.
      this.atStart = el.scrollLeft <= 8;
      this.atEnd = max <= 8 || el.scrollLeft >= max - 8;
    },
    step(dir) {
      const el = this.$refs.track;
      if (dir > 0 && this.atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else carouselStep(el, dir);
    },
  }));

  /**
   * "Cross Reference" / "Search Now": the cross-reference lookup is the header
   * search ("Cross-Reference Catalog # or Search by Description"), so focus it
   * and let it open its suggestions. Falls back to the link (/search/).
   */
  Alpine.data("catalogSearch", () => ({
    open() {
      const input = [...document.querySelectorAll('header input[name="q"]')].find((i) => i.offsetParent !== null);
      if (!input) {
        window.location.href = this.$el.href;
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      input.focus({ preventScroll: true });
    },
  }));

  /** FAQ accordion (Repair Services 34799:68632): one answer open at a time, all closed on load. */
  Alpine.data("faq", () => ({
    open: null,
    toggle(id) {
      this.open = this.open === id ? null : id;
    },
  }));

  /**
   * Conditions of Sale search ("Search Terms & Conditions", Figma 35098:39790). Two letters or more show only the
   * subsections ([data-term]) that contain the words, hide sections ([data-term-section]) and index links
   * ([data-term-link]) left without one, dim the section bar's tabs of hidden sections and mark the matches with the
   * CSS Custom Highlight API (::highlight(terms-search) in app.css; browsers without it only filter). Enter scrolls to
   * the next matching subsection. A section bar tab of a hidden section clears the search before jumping there.
   */
  Alpine.data("termsSearch", () => ({
    q: "",
    hits: 0,
    next: 0,
    init() {
      this.terms = [...document.querySelectorAll("[data-term]")];
      this.sections = [...document.querySelectorAll("[data-term-section]")];
      this.links = [...document.querySelectorAll("[data-term-link]")];
      this.tabs = [...document.querySelectorAll("[data-section]")];
      this.tabs.forEach((tab) =>
        tab.addEventListener("click", () => {
          if (document.getElementById(tab.dataset.section)?.style.display === "none") this.clear();
        }),
      );
      this.$watch("q", () => this.run());
    },
    get needle() {
      const n = this.q.trim().replace(/\s+/g, " ").toLowerCase();
      return n.length > 1 ? n : "";
    },
    run() {
      const n = this.needle;
      const ranges = [];
      this.hits = 0;
      this.next = 0;
      for (const t of this.terms) {
        const hit = !n || t.textContent.replace(/\s+/g, " ").toLowerCase().includes(n);
        t.style.display = hit ? "" : "none";
        if (!hit) continue;
        if (n) {
          this.hits++;
          ranges.push(...this.rangesIn(t, n));
        }
      }
      for (const s of this.sections) {
        const empty = !s.querySelector("[data-term]:not([style*='none'])");
        s.style.display = empty ? "none" : "";
        this.tabs.find((tab) => tab.dataset.section === s.id)?.classList.toggle("opacity-40", empty);
      }
      for (const l of this.links) {
        l.style.display = document.getElementById(l.dataset.termLink).style.display;
      }
      if (window.CSS && CSS.highlights) {
        if (ranges.length) CSS.highlights.set("terms-search", new Highlight(...ranges));
        else CSS.highlights.delete("terms-search");
      }
      // The section bar (aboutSubnav) re-reads which section is in view.
      window.dispatchEvent(new Event("resize"));
    },
    /** Ranges of `n` in the element's text nodes (matches inside one text node; enough for words and phrases). */
    rangesIn(el, n) {
      const out = [];
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let node = walk.nextNode(); node; node = walk.nextNode()) {
        const text = node.data.replace(/\s/g, " ").toLowerCase();
        for (let i = text.indexOf(n); i !== -1; i = text.indexOf(n, i + n.length)) {
          const r = new Range();
          r.setStart(node, i);
          r.setEnd(node, i + n.length);
          out.push(r);
        }
      }
      return out;
    },
    /** Enter / the search button: scroll to the next matching subsection, from the top again after the last. */
    go() {
      const shown = this.terms.filter((t) => t.style.display !== "none");
      if (!this.needle || !shown.length) return;
      shown[this.next % shown.length].scrollIntoView({ behavior: "smooth", block: "start" });
      this.next++;
    },
    clear() {
      this.q = "";
      this.run();
    },
  }));

  /** Table rows filtered by their first cell (Conditions of Sale manufacturer table, "Search product lines" 35098:39836). */
  Alpine.data("tableFilter", (rows) => ({
    q: "",
    rows,
    get shown() {
      const n = this.q.trim().toLowerCase();
      return n ? this.rows.filter((r) => r[0].toLowerCase().includes(n)) : this.rows;
    },
  }));

  /** Contact form: native validation, then a toast and a reset (the form posts nowhere). */
  Alpine.data("contactForm", () => ({
    submit() {
      const name = (this.$el.elements.namedItem("name").value || "").trim().split(/\s+/)[0];
      toast({ message: `Thank you${name ? ", " + name : ""}. Our instrument specialists respond within one business day.` });
      this.$el.reset();
    },
  }));
});
