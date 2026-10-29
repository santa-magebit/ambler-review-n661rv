/*
 * Alpine components for the "account" pages (My Account, Figma page "My Account").
 * Helpers from app.js: url(), money(), toast(), findProduct(), findBySku().
 *
 * Forms submit nowhere: each submit() moves to the next designed screen. Messages
 * meant for the next page are kept in sessionStorage ("flash") and shown as a toast
 * once that page has started, the way Magento shows its session messages.
 */
(() => {
  const FLASH_KEY = "ambler-proto-flash";

  /** Remember a message for the next page (Magento session message stand-in). */
  const flash = (message) => {
    try {
      sessionStorage.setItem(FLASH_KEY, message);
    } catch {
      /* storage blocked: no message */
    }
  };

  const go = (path) => {
    window.location.href = url(path);
  };

  /** ?empty shows the designed empty state of a list page (Address Book, My Orders). */
  const wantsEmpty = () => new URLSearchParams(window.location.search).has("empty");

  /** Remove a list entry: its table row and its phone card share data-row (both are in the page). */
  const removeRow = (root, el) => {
    root.querySelectorAll(`[data-row="${el.dataset.row}"]`).forEach((n) => n.remove());
  };

  /** The items of the designed order (#000000368), by item number. */
  const ORDER_SKUS = ["14205", "BCD-10", "2084E"];

  /** Reorder: put the order lines back in the cart and open the mini cart. */
  const reorder = () => {
    const cart = window.Alpine.store("cart");
    const products = ORDER_SKUS.map((sku) => findBySku(sku)).filter(Boolean);
    products.forEach((p, i) => cart.add(p.slug, 1, { open: i === products.length - 1 }));
  };

  // Show the message left by the previous page once the toaster is listening.
  document.addEventListener("alpine:initialized", () => {
    let message = null;
    try {
      message = sessionStorage.getItem(FLASH_KEY);
      sessionStorage.removeItem(FLASH_KEY);
    } catch {
      /* storage blocked */
    }
    if (message) setTimeout(() => toast({ message }), 0);
  });

  document.addEventListener("alpine:init", () => {
    const Alpine = window.Alpine;

    /**
     * Customer Login (14714:118247) and Create New Account (14714:118278): sign in, then go to ?return
     * (a page that needs a signed-in customer, e.g. Quick Order) or the dashboard. With checkLogin the
     * e-mail and password must match the test account.
     */
    Alpine.data("accountAuthForm", (message = "", checkLogin = false) => ({
      error: false,
      submit() {
        if (checkLogin) {
          const form = this.$el;
          this.error = !this.$store.auth.matches(form.elements.namedItem("email").value, form.elements.namedItem("login-password").value);
          if (this.error) return;
        }
        this.$store.auth.signIn();
        if (message) flash(message);
        const back = new URLSearchParams(window.location.search).get("return") || "";
        go(back.startsWith("/") && !back.startsWith("//") ? back : "/customer/account/");
      },
      /** "Use test account": fill the login form with the prototype account. */
      fillTestAccount() {
        const form = this.$el.closest("form");
        form.elements.namedItem("email").value = window.TEST_ACCOUNT.email;
        form.elements.namedItem("login-password").value = window.TEST_ACCOUNT.password;
        this.error = false;
      },
    }));

    /**
     * Signed Out (29434:83818), Magento's /customer/account/logoutSuccess/: home after 5 seconds, as the page
     * says. Only when reached by Sign Out (app.js auth.signOut leaves a mark), so the page can be opened for review.
     */
    Alpine.data("signedOut", () => ({
      init() {
        let fromSignOut = false;
        try {
          fromSignOut = sessionStorage.getItem("ambler-proto-signed-out") === "1";
          sessionStorage.removeItem("ambler-proto-signed-out");
        } catch {
          /* storage blocked: the page stays */
        }
        if (fromSignOut) setTimeout(() => go("/"), 5000);
      },
    }));

    /** Forgot Your Password? (14714:118400): show the confirmation in place of the form. */
    Alpine.data("forgotPassword", () => ({
      email: "",
      sent: false,
      submit() {
        this.sent = true;
      },
    }));

    /** Edit Account Information (14714:137321 / 14714:137357): checkboxes reveal the email and password fields. */
    Alpine.data("accountEdit", () => ({
      changeEmail: false,
      // Dashboard "Change Password" links here with ?changepass (Magento: /customer/account/edit/changepass/1/).
      changePassword: new URLSearchParams(window.location.search).has("changepass"),
      submit() {
        flash("You saved the account information.");
        go("/customer/account/");
      },
    }));

    /** Address Book (14714:137202), empty state "No Additional Addresses" (23115:35427) via ?empty or by deleting every row. */
    Alpine.data("addressBook", (count = 0) => ({
      count: wantsEmpty() ? 0 : count,
      remove(row) {
        removeRow(this.$root, row);
        this.count -= 1;
        toast({ message: "You deleted the address." });
      },
    }));

    /** New Address (14714:137391): Save returns to the address book. */
    Alpine.data("addressForm", () => ({
      submit() {
        flash("You saved the address.");
        go("/customer/address/");
      },
    }));

    /** My Orders (14714:137435), empty state "You haven't ordered yet" (32215:84205) via ?empty. */
    Alpine.data("orderHistory", () => ({
      empty: wantsEmpty(),
    }));

    /** Reorder icon in the order tables. */
    Alpine.data("orderActions", () => ({ reorder }));

    /** Order view (14714:137948) with the Invoices / Shipments / Refunds tabs; #invoices etc. opens a tab. */
    Alpine.data("orderView", () => ({
      tabs: ["items", "invoices", "shipments", "refunds"],
      tab: "items",
      init() {
        this.fromHash();
      },
      fromHash() {
        const hash = window.location.hash.slice(1);
        this.tab = this.tabs.includes(hash) ? hash : "items";
        this.$nextTick(() => this.revealTab());
      },
      select(name) {
        this.tab = name;
        history.replaceState(null, "", name === "items" ? window.location.pathname : `#${name}`);
        this.revealTab();
      },
      /** Phones: the tab row scrolls sideways (14714:138846); keep the selected tab in view. */
      revealTab() {
        const tab = this.$refs[`tab-${this.tab}`];
        const row = tab.parentElement;
        const t = tab.getBoundingClientRect();
        const r = row.getBoundingClientRect();
        if (t.right > r.right) row.scrollLeft += t.right - r.right;
        else if (t.left < r.left) row.scrollLeft -= r.left - t.left;
      },
      /** Arrow keys move between tabs (WAI-ARIA tabs pattern). */
      step(delta) {
        const i = (this.tabs.indexOf(this.tab) + delta + this.tabs.length) % this.tabs.length;
        this.select(this.tabs[i]);
        this.$nextTick(() => this.$refs[`tab-${this.tab}`].focus());
      },
      print() {
        window.print();
      },
      reorder,
    }));

    /** Gift Card (34266:49954): Check Balance shows the result card (34266:54383). */
    Alpine.data("giftCard", () => ({
      number: "",
      checked: false,
      check() {
        this.checked = true;
      },
      another() {
        this.checked = false;
        this.number = "";
        this.$nextTick(() => this.$refs.number.focus());
      },
    }));

    /** Stored Payment Methods (34266:54872): the trash icon removes the card. */
    Alpine.data("storedCards", (count = 0) => ({
      count,
      remove(row) {
        removeRow(this.$root, row);
        this.count -= 1;
        toast({ message: "Stored Payment Method was successfully removed." });
      },
    }));

    /** Privacy Settings (34385:27016) and its Download / Anonymise / Delete modals. */
    Alpine.data("privacySettings", () => ({
      modal: null,
      password: "",
      messages: {
        download: "Your personal data is being prepared. The CSV download will start shortly.",
        anonymise: "Your request to anonymise your personal data has been received.",
        delete: "Your account deletion request has been submitted.",
      },
      open(name) {
        this.password = "";
        this.modal = name;
      },
      close() {
        this.modal = null;
      },
      confirm() {
        const message = this.messages[this.modal];
        this.close();
        toast({ message });
      },
    }));
  });
})();
