/*
 * Alpine components for the "pdp-cart" pages: product page (gallery + zoom, buy box,
 * related products carousel), cart page and quick order.
 * Helpers from app.js: url(), money(), toast(), findProduct(), findBySku().
 */
document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  /**
   * PDP gallery card (34659:60344) and the "PDP - Zoom" overlay (21171:386870).
   * images: site paths such as "/img/55dde4bd.jpg"; url() adds the base path.
   */
  Alpine.data("pdpGallery", (images = []) => ({
    images: images.map((src) => window.url(src)),
    index: 0,
    zoom: false,
    touch: null,
    get many() {
      return this.images.length > 1;
    },
    get src() {
      return this.images[this.index];
    },
    show(i) {
      this.index = (i + this.images.length) % this.images.length;
    },
    next() {
      this.show(this.index + 1);
    },
    prev() {
      this.show(this.index - 1);
    },
    open() {
      this.zoom = true;
    },
    /** Phone slider (34224:49918) and zoom (21171:387659): a sideways swipe shows the next / previous image. */
    touchStart(e) {
      const t = e.changedTouches[0];
      this.touch = { x: t.clientX, y: t.clientY };
    },
    touchEnd(e) {
      if (!this.touch || !this.many) return;
      const dx = e.changedTouches[0].clientX - this.touch.x;
      const dy = e.changedTouches[0].clientY - this.touch.y;
      this.touch = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? this.next() : this.prev();
    },
    close() {
      this.zoom = false;
      this.$nextTick(() => this.$refs.opener && this.$refs.opener.focus());
    },
  }));

  /** Buy box: quantity stepper + Add to Cart (opens the mini cart). */
  Alpine.data("pdpBuy", (slug) => ({
    qty: 1,
    add() {
      this.$store.cart.add(slug, this.qty);
      this.qty = 1;
    },
  }));

  /**
   * Related products carousel: horizontally scrolling track, 2px progress bar and
   * prev/next buttons (34826:20504).
   */
  Alpine.data("relatedCarousel", () => ({
    thumb: 100,
    offset: 0,
    atStart: true,
    atEnd: true,
    init() {
      const update = () => this.update();
      this.$refs.track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      this.$nextTick(update);
    },
    update() {
      const t = this.$refs.track;
      const max = t.scrollWidth - t.clientWidth;
      this.thumb = t.scrollWidth ? (t.clientWidth / t.scrollWidth) * 100 : 100;
      this.offset = max > 0 ? (t.scrollLeft / max) * (100 - this.thumb) : 0;
      this.atStart = t.scrollLeft <= 1;
      this.atEnd = t.scrollLeft >= max - 1;
    },
    step(dir) {
      carouselStep(this.$refs.track, dir);
    },
  }));

  /** Cart page (14714:103185, empty state 21071:135304). Lines come from $store.cart. */
  Alpine.data("cartPage", () => ({
    panel: null,
    discount: 0,
    get grandTotal() {
      return Math.max(0, this.$store.cart.subtotal - this.discount);
    },
    toggle(name) {
      this.panel = this.panel === name ? null : name;
    },
    /** "14205 Orange polycarbonate eye shields, universal, non-sterile, packaged 100 per box" */
    lineText(p) {
      const desc = p.variant ? "" : ", " + p.description.charAt(0).toLowerCase() + p.description.slice(1);
      return (p.sku ? p.sku + " " : "") + p.name + desc;
    },
  }));

  /**
   * Quick Order (34391:65496): SKU rows matched with findBySku(), Add to Cart adds the
   * matched rows ("Items Added" 34403:67202 / 34513:74023), CSV upload is simulated
   * ("CSV Upload Summary" 34547:112188).
   */
  const NOT_FOUND = "SKU not found. Verify the number or check the catalog.";
  let uid = 0;
  const row = (sku = "", qty = 1) => ({ id: ++uid, sku, qty, error: "" });
  const emptyRows = () => [row(), row(), row(), row()];

  Alpine.data("quickOrder", (csv = { csvErrors: [], csvValid: [] }) => ({
    rows: emptyRows(),
    notice: "",
    csvOpen: false,
    csv,
    product(r) {
      return r.sku.trim() ? window.findBySku(r.sku) : null;
    },
    subtotal(r) {
      const p = this.product(r);
      return p ? p.price * r.qty : 0;
    },
    check(r) {
      r.error = r.sku.trim() && !this.product(r) ? NOT_FOUND : "";
    },
    get filled() {
      return this.rows.filter((r) => r.sku.trim());
    },
    get dirty() {
      return this.filled.length > 0 || this.notice !== "" || this.rows.length !== 4;
    },
    addRow() {
      this.rows.push(row());
      this.$nextTick(() => {
        const inputs = this.$root.querySelectorAll("[data-sku-input]");
        inputs[inputs.length - 1]?.focus();
      });
    },
    removeRow(r) {
      this.rows = this.rows.length > 1 ? this.rows.filter((x) => x.id !== r.id) : [row()];
    },
    reset() {
      this.rows = emptyRows();
      this.notice = "";
    },
    addToCart() {
      const filled = this.filled;
      if (!filled.length) return;
      const ok = filled.filter((r) => this.product(r));
      const failed = filled.filter((r) => !this.product(r));
      ok.forEach((r) => this.$store.cart.add(this.product(r).slug, r.qty, { open: failed.length === 0 }));
      if (!failed.length) {
        this.reset();
        return;
      }
      failed.forEach((r) => (r.error = NOT_FOUND));
      this.rows = failed;
      const n = failed.length;
      this.notice = `${ok.length} of ${filled.length} SKUs were added to your cart. The ${n} below ${n === 1 ? "needs" : "need"} your attention.`;
      this.$nextTick(() => this.$refs.notice && this.$refs.notice.focus());
    },
    chooseFile() {
      this.$refs.file.click();
    },
    fileChosen(e) {
      if (e.target.files && e.target.files.length) this.csvOpen = true;
      e.target.value = "";
    },
    addValid() {
      this.rows = this.csv.csvValid.map((l) => row(l.sku, l.qty));
      this.notice = "";
      this.csvOpen = false;
    },
  }));
});
