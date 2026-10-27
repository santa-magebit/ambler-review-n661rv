/*
 * Alpine components for the "content" pages (Home, About, Repair Services,
 * Sterilization, Contact). Registered before Alpine starts. Helpers from app.js:
 * url(), money(), toast(), findProduct(), findBySku().
 */
document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  /**
   * About sticky sub-navigation (Figma 34974:1154, scrolled state 34971:56681).
   * Tabs are anchor links ([data-section] = section id); the tab of the section
   * under the bar gets the orange underline. The bar pins under the sticky site
   * header (top: var(--header-h)); sections use scroll-mt-[69px] for the bar and
   * the page's scroll-padding-top covers the header.
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
      let current = this.ids[0];
      for (const id of this.ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = document.getElementById(this.ids[this.ids.length - 1]);
        if (last && last.getBoundingClientRect().top < window.innerHeight) current = this.ids[this.ids.length - 1];
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
    /** Phones: keep the active tab visible in the horizontally scrolling tab row. */
    reveal() {
      const list = this.$refs.tabs;
      const tab = list && list.querySelector(`[data-section="${this.active}"]`);
      if (!tab || list.scrollWidth <= list.clientWidth) return;
      const left = tab.offsetLeft - list.offsetLeft;
      if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
      }
    },
  }));

  /** Horizontal card slider (About "Customer Testimonials" 34974:1295 + controls 34974:1323). x-ref="track". */
  Alpine.data("slider", () => ({
    progress: 0,
    atStart: true,
    atEnd: false,
    init() {
      this.update();
      window.addEventListener("resize", () => this.update());
    },
    update() {
      const el = this.$refs.track;
      const max = el.scrollWidth - el.clientWidth;
      this.progress = max > 0 ? Math.min(1, el.scrollLeft / max) : 0;
      this.atStart = el.scrollLeft <= 1;
      this.atEnd = max <= 1 || el.scrollLeft >= max - 1;
    },
    step(dir) {
      const el = this.$refs.track;
      const card = el.querySelector("li");
      if (card) el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
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

  /** FAQ accordion (Repair Services 34799:68632): one answer open at a time. */
  Alpine.data("faq", (first = null) => ({
    open: first,
    toggle(id) {
      this.open = this.open === id ? null : id;
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
