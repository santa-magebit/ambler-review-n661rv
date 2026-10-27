/*
 * Alpine components for the "plp" pages (product listings).
 * Helpers from app.js: url(), money(), toast(), findProduct(), findBySku().
 *
 * plpListing(cfg): one listing = filter panel + toolbar + grid + pagination
 * (markup: src/_includes/plp/macros.njk, cfg: src/_data/plp.js listing()).
 * Every product card is rendered on the server; the component decides which
 * cards are visible (x-show="isShown(slug)") and in which order (CSS order,
 * :style="{ order: rank(slug) }"), so the markup stays server-rendered.
 *
 * Hyvä mapping: this replaces layered navigation + toolbar requests with
 * client-side filtering over the products already on the page.
 */
document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  const SORTS = [
    { value: "name-asc", label: "Product name A-Z" },
    { value: "name-desc", label: "Product name Z-A" },
    { value: "price-asc", label: "Price low to high" },
    { value: "price-desc", label: "Price high to low" },
  ];
  const lower = (s) => String(s || "").toLowerCase();
  /** Same fields as the header search (app.js searchBox): name, item number, description, type. */
  const matches = (p, needle) => !needle || [p.name, p.sku, p.description, p.typeName].some((v) => lower(v).includes(needle));
  const groupOf = (key) => key.slice(0, key.indexOf(":"));
  const byName = (a, b) => a.p.name.localeCompare(b.p.name, "en", { sensitivity: "base" });

  Alpine.data("plpListing", (cfg) => ({
    items: cfg.items.map((i) => ({ slug: i.s, keys: i.f, p: window.findProduct(i.s) })).filter((i) => i.p),
    attrs: cfg.attributes || [],
    groupLabels: cfg.groups || {},
    active: cfg.active,
    applied: [],
    allChips: false,
    // Chips that fit on the strip's first row (fitChips); measuring shows them all for a moment to measure.
    fit: Infinity,
    measuring: false,
    query: "",
    within: "",
    sort: "name-asc",
    sorts: SORTS,
    page: 1,
    perPage: cfg.perPage,
    perPageOptions: [...new Set([12, cfg.perPage, 40])].sort((a, b) => a - b),
    // Filter screen on phones (mobile-filters 34731:36331): open, its expanded attribute, filters it opened with.
    sheet: false,
    sheetAttr: cfg.active,
    sheetFrom: [],

    init() {
      const params = new URLSearchParams(window.location.search);
      if (cfg.search) this.query = (params.get("q") || "").trim();
      // Pre-applied filters from links, e.g. ?manufacturer=Duckworth%20%26%20Kent or ?name=Castroviejo
      const known = new Set(this.items.flatMap((i) => i.keys));
      const keys = [...params].map(([k, v]) => `${k}:${v}`).filter((k) => known.has(k) && this.groupLabels[groupOf(k)]);
      if (keys.length) {
        this.applied = keys;
        this.active = this.sheetAttr = this.attrOf(keys[0]) || this.active;
      }
      // Ticking a checkbox filters straight away (x-model="applied"): back to page 1.
      this.$watch("applied", () => {
        this.page = 1;
        this.fitChips();
      });
      let frame = 0;
      window.addEventListener("resize", () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => this.fitChips());
      });
      if (document.fonts) document.fonts.ready.then(() => this.fitChips());
      this.fitChips();
    },

    // --- product sets ---------------------------------------------------
    /** Products matching the page search (search page only). */
    get found() {
      const n = lower(this.query);
      return this.items.filter((i) => matches(i.p, n));
    },
    /** …narrowed by "Search within". */
    get base() {
      const n = lower(this.within.trim());
      return this.found.filter((i) => matches(i.p, n));
    },
    /** Applied filters grouped: { groupKey: [keys] } — OR inside a group, AND across groups. */
    get appliedByGroup() {
      return this.applied.reduce((acc, k) => ((acc[groupOf(k)] ||= []).push(k), acc), {});
    },
    passes(item, exceptGroup = null) {
      return Object.entries(this.appliedByGroup).every(([g, keys]) => g === exceptGroup || keys.some((k) => item.keys.includes(k)));
    },
    get filtered() {
      return this.base.filter((i) => this.passes(i));
    },
    get sorted() {
      const list = [...this.filtered];
      if (this.sort === "name-asc") list.sort(byName);
      if (this.sort === "name-desc") list.sort((a, b) => byName(b, a));
      if (this.sort === "price-asc") list.sort((a, b) => a.p.price - b.p.price || byName(a, b));
      if (this.sort === "price-desc") list.sort((a, b) => b.p.price - a.p.price || byName(a, b));
      return list;
    },
    get total() {
      return this.filtered.length;
    },
    get pages() {
      return Math.max(1, Math.ceil(this.total / this.perPage));
    },
    get current() {
      return Math.min(this.page, this.pages);
    },
    get visible() {
      const start = (this.current - 1) * this.perPage;
      return new Set(this.sorted.slice(start, start + this.perPage).map((i) => i.slug));
    },
    isShown(slug) {
      return this.visible.has(slug);
    },
    rank(slug) {
      return this.sorted.findIndex((i) => i.slug === slug);
    },

    // --- labels -----------------------------------------------------------
    get resultsLabel() {
      return `${this.total} result${this.total === 1 ? "" : "s"}`;
    },
    get itemsLabel() {
      const from = (this.current - 1) * this.perPage + 1;
      const to = Math.min(this.total, this.current * this.perPage);
      return `Items ${from}-${to} of ${this.total}`;
    },
    get sortLabel() {
      return (SORTS.find((s) => s.value === this.sort) || SORTS[0]).label;
    },
    /** First and last page of a window of `span` pages around the current one. */
    pageWindow(span) {
      let start = Math.max(1, this.current - Math.floor(span / 2));
      const end = Math.min(this.pages, start + span - 1);
      start = Math.max(1, end - span + 1);
      return [start, end];
    },
    get pageList() {
      const [start, end] = this.pageWindow(5);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    /** Phones show 3 of the 5 page buttons (34730:7891). */
    nearPage(n) {
      const [start, end] = this.pageWindow(3);
      return n >= start && n <= end;
    },

    // --- filter panel -----------------------------------------------------
    groupLabel(key) {
      return this.groupLabels[groupOf(key)] || groupOf(key);
    },
    valueLabel(key) {
      return key.slice(key.indexOf(":") + 1);
    },
    attrOf(key) {
      return (this.attrs.find((a) => a.groups.includes(groupOf(key))) || {}).key;
    },
    /** Products an option would show, given the other applied filters. */
    countOf(key) {
      const g = groupOf(key);
      return this.base.filter((i) => i.keys.includes(key) && this.passes(i, g)).length;
    },
    /** Checked options under a left-hand attribute. */
    attrCount(attrKey) {
      const a = this.attrs.find((x) => x.key === attrKey);
      return a ? this.applied.filter((k) => a.groups.includes(groupOf(k))).length : 0;
    },
    /** Filter strip: chips stay on one row; the ones that don't fit wait behind "+x more". */
    chipShown(i) {
      return this.allChips || this.measuring || i < this.fit;
    },
    get hiddenChips() {
      return this.allChips ? 0 : Math.max(0, this.applied.length - this.fit);
    },
    fitChips() {
      if (this.allChips) return;
      this.measuring = true;
      this.$nextTick(() => {
        const ul = this.$refs.chips;
        const widths = ul ? [...ul.querySelectorAll("[data-chip]")].map((li) => li.getBoundingClientRect().width) : [];
        const room = ul ? ul.clientWidth : 0;
        if (room) {
          const gap = parseFloat(getComputedStyle(ul).columnGap) || 0;
          const more = this.$refs.more.getBoundingClientRect().width;
          // k chips, plus the "+x more" link when some are left over
          const rowWidth = (k) => widths.slice(0, k).reduce((sum, w) => sum + w + gap, 0) + (k < widths.length ? more : -gap);
          let k = widths.length;
          while (k > 0 && rowWidth(k) > room + 0.5) k--;
          this.fit = k;
        }
        this.measuring = false;
      });
    },
    remove(key) {
      this.applied = this.applied.filter((k) => k !== key);
    },
    clearAll() {
      this.applied = [];
      this.allChips = false;
    },
    /** Show only one filter value (category cards, "Browse by Name", quick select). */
    only(key) {
      if (!this.items.some((i) => i.keys.includes(key))) return;
      this.applied = [key];
      this.active = this.sheetAttr = this.attrOf(key) || this.active;
      this.within = "";
      this.page = 1;
      this.$nextTick(() => this.$el.scrollIntoView({ behavior: "smooth", block: "start" }));
    },

    // --- filter screen (phones) -------------------------------------------
    openSheet() {
      this.sheetFrom = [...this.applied];
      this.sheet = true;
    },
    /** Cancel: back to the filters the screen opened with. */
    cancelSheet() {
      if (this.applied.join("|") !== this.sheetFrom.join("|")) this.applied = [...this.sheetFrom];
      this.sheet = false;
    },

    // --- toolbar & pagination -------------------------------------------------
    setSort(value) {
      this.sort = value;
      this.page = 1;
    },
    setPerPage(n) {
      this.perPage = n;
      this.page = 1;
    },
    go(n) {
      this.page = Math.min(Math.max(1, n), this.pages);
      this.$refs.top.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  }));

  /** "All Product Lines" (34907:8416): search by name and sort the tiles (x-show + CSS order). */
  Alpine.data("plpLines", () => ({
    q: "",
    sort: "featured",
    sorts: [
      { value: "featured", label: "Featured" },
      { value: "name-asc", label: "Name A-Z" },
      { value: "name-desc", label: "Name Z-A" },
    ],
    lines: [],
    init() {
      // Featured = the order drawn in Figma, read from the server-rendered tiles.
      this.lines = [...this.$el.querySelectorAll("[data-name]")].map((li, i) => ({ slug: li.dataset.slug, name: li.dataset.name, i }));
    },
    get list() {
      const n = this.q.trim().toLowerCase();
      const list = this.lines.filter((l) => l.name.toLowerCase().includes(n));
      if (this.sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
      if (this.sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
      return list;
    },
    get count() {
      return this.list.length;
    },
    get countLabel() {
      return `${this.count} product line${this.count === 1 ? "" : "s"}`;
    },
    get sortLabel() {
      return this.sorts.find((s) => s.value === this.sort).label;
    },
    isShown(slug) {
      return this.list.some((l) => l.slug === slug);
    },
    rank(slug) {
      return this.list.findIndex((l) => l.slug === slug);
    },
  }));
});
