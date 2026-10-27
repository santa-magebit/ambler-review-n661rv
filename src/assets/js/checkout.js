/*
 * Alpine components for the "checkout" pages. Register with Alpine.data() inside the
 * alpine:init listener. Helpers from app.js: url(), money(), toast(), findProduct(), findBySku().
 *
 * checkout: the one-page checkout (/checkout/). Guest or signed-in layout comes from
 * $store.auth.loggedIn; the order summary reads $store.cart. Static content comes from
 * src/_data/checkout.js, rendered into <script type="application/json" id="checkout-config">.
 * Hyvä mapping: this stands in for the checkout's Magewire/Alpine components; nothing is
 * validated or sent (card fields are a visual mock and are never read).
 */
document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  /** "$ 1,234.00": the price format drawn in the Figma checkout. */
  const price = (n) => "$ " + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const readConfig = () => {
    try {
      return JSON.parse(document.getElementById("checkout-config").textContent);
    } catch {
      return { accountEmail: "", shippingMethods: [], savedAddresses: [], accountCart: [], discount: 0 };
    }
  };

  Alpine.data("checkout", () => {
    const config = readConfig();
    // Same defaults for guests and customers: summary panels closed, billing = shipping,
    // first payment method. The Figma frames draw the open panels (34799:87723), the billing
    // address block and Purchase Order (34799:88544) as examples of those states.
    return {
      price,

      /* Contacts (guest) and the SUR-359 "already have an account" prompt */
      email: "",
      guestEmail: "", // e-mail the shopper chose "Continue as Guest" for
      showPassword: false,
      get accountMatch() {
        const e = this.email.trim().toLowerCase();
        return !this.$store.auth.loggedIn && e !== "" && e === config.accountEmail && e !== this.guestEmail;
      },
      continueAsGuest() {
        this.guestEmail = this.email.trim().toLowerCase();
      },
      /** Sign in from the prompt: switch to the signed-in layout, then offer to merge carts once. */
      signIn() {
        this.$store.auth.signIn();
        this.showPassword = false;
        window.scrollTo({ top: 0 });
        if (config.accountCart.length && this.$store.cart.items.length) this.modal = "merge";
      },

      /* Addresses */
      manual: { shipping: true, billing: false }, // guest: manual fields (true) or the address finder
      billingSame: true,
      addresses: config.savedAddresses.map((a) => ({ ...a, lines: [...a.lines] })),
      shippingAddress: config.savedAddresses[0]?.id,
      billingAddress: config.savedAddresses[0]?.id,
      /** "Raymond Myers, 100 Legends Way, Boston, Massachusetts 02114" (billing "Select Address"). */
      oneLine(id) {
        const a = this.addresses.find((x) => x.id === id);
        return a ? a.lines.filter((l) => !l.startsWith("T: ") && l !== "United States").join(", ") : "";
      },

      /* Modals: "address" (New Address 34799:88710) or "merge" (34799:89813) */
      modal: null,
      addressFor: "shipping",
      draftManual: false,
      openAddress(target) {
        this.addressFor = target;
        this.draftManual = false;
        this.modal = "address";
      },
      /** "Ship Here": add what was typed as a new address card and select it. */
      saveAddress(form) {
        const f = new FormData(form);
        const v = (k) => String(f.get(`address[${k}]`) || "").trim();
        const name = [v("firstname"), v("lastname")].filter(Boolean).join(" ");
        const street = this.draftManual ? [v("street1"), v("street2")].filter(Boolean).join(", ") : v("search");
        const place = this.draftManual ? [v("city"), [v("region"), v("postcode")].filter(Boolean).join(" ")].filter(Boolean).join(", ") : "";
        const lines = [name, street, place, this.draftManual ? v("country") : "", v("telephone") && `T: ${v("telephone")}`].filter(Boolean);
        if (lines.length) {
          const id = `address-${Date.now()}`;
          this.addresses.push({ id, lines });
          if (this.addressFor === "billing") this.billingAddress = id;
          else this.shippingAddress = id;
        }
        form.querySelectorAll("input:not([type=checkbox]), select").forEach((el) => (el.value = el.tagName === "SELECT" ? el.options[0]?.value ?? "" : ""));
        this.modal = null;
      },

      /* Merge cart modal */
      merged: [],
      mergeCarts() {
        this.merged = config.accountCart.map((i) => ({ ...i }));
        this.modal = null;
      },
      keepGuestCart() {
        this.merged = [];
        this.modal = null;
      },

      /* Order summary panels */
      panels: { discount: false, giftcard: false, comment: false },

      /* Shipping and payment */
      methods: config.shippingMethods,
      shipping: config.shippingMethods[0]?.id,
      payment: "card",
      terms: false,

      /* Order summary: the real cart plus, after a merge, the account cart lines */
      get empty() {
        return this.$store.cart.items.length === 0;
      },
      get lines() {
        const cart = this.$store.cart.items.map((i) => ({
          key: i.slug,
          qty: i.qty,
          name: i.product.name,
          image: i.product.image,
          total: i.qty * i.product.price,
        }));
        return [...cart, ...this.merged];
      },
      get subtotal() {
        return this.lines.reduce((n, l) => n + l.total, 0);
      },
      get method() {
        return this.methods.find((m) => m.id === this.shipping) || { label: "", price: 0 };
      },
      discount: config.discount,
      get grandTotal() {
        return Math.max(0, this.subtotal - this.discount + this.method.price);
      },

      placeOrder() {
        if (!this.terms || this.empty) return;
        window.location.href = url("/checkout/onepage/success/");
      },
    };
  });
});
