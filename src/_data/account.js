// My Account content, as drawn in the Figma "My Account" frames. Each frame
// uses its own sample customer, so values are kept per screen as designed.

/** Dashboard and Address Book: default billing and shipping address (the same address in Figma). */
const defaultAddress = {
  name: "Raymond Myers",
  street: "100 Legends Way",
  cityLine: "Boston, Massachusetts 02114",
  country: "United States",
  phone: "617-624-1000",
};

/** "Veronica Costello" address in "Order Information" (order view frames). */
const orderAddress = ["Veronica Costello", "6146 Honey Bluff Parkway", "Calder, Michigan 49628-7978", "United States", "(555) 229-3326"];

/** Order rows (dashboard "Recent Orders" 14714:137120 and "My Orders" 14714:137460). */
const orders = [
  { number: "000006789", date: "4/3/24", shipTo: "100 Legends Way, Boston, United States", total: "$328.41", status: "Pending" },
  { number: "000006234", date: "12/3/24", shipTo: "Brīvības iela 39, Liepaja, Latvia", total: "$42.00", status: "Completed" },
  { number: "000006789", date: "4/3/24", shipTo: "100 Legends Way, Boston, United States", total: "$328.41", status: "Cancelled" },
  { number: "000006234", date: "12/3/24", shipTo: "Brīvības iela 39, Liepaja, Latvia", total: "$42.00", status: "Processing" },
  { number: "000006789", date: "4/3/24", shipTo: "100 Legends Way, Boston, United States", total: "$328.41", status: "Completed" },
  { number: "000006234", date: "12/3/24", shipTo: "Brīvības iela 39, Liepaja, Latvia", total: "$42.00", status: "Completed" },
];

export default {
  /** Dashboard "Contact Information" card (14714:137077). */
  customer: { name: "Raymond Myers", email: "raymond.myers@gmail.com" },

  /** "Edit Account Information" form values (14714:137321). */
  accountForm: { firstName: "John", lastName: "Smith", email: "john.smit@gmail.com" },

  defaultAddress,

  /** Address Book table rows (14714:137248). */
  addresses: [
    { street: "100 Legends Way, Boston, United States", name: "Raymond Myers", city: "Boston" },
    { street: "Brīvības iela 39, Liepaja, Latvia", name: "Raymond Myers", city: "Liepaja" },
    { street: "100 Legends Way, Boston, United States", name: "Raymond Myers", city: "Boston" },
    { street: "Brīvības iela 39, Liepaja, Latvia", name: "Raymond Myers", city: "Liepaja" },
    { street: "100 Legends Way, Boston, United States", name: "Raymond Myers", city: "Boston" },
    { street: "Brīvības iela 39, Liepaja, Latvia", name: "Raymond Myers", city: "Liepaja" },
  ],

  /** New Address selects: only the countries and regions that appear in the Figma addresses. */
  countries: ["United States", "Latvia"],
  regions: ["Massachusetts", "Michigan"],

  orders,

  /** Status badge colours (styleguide "status" 34747:15393..15408). */
  statusStyles: {
    Pending: "border-warning bg-warning-light",
    Completed: "border-success bg-success-light",
    Cancelled: "border-error bg-error-light",
    Processing: "border-body bg-white",
    Active: "border-success bg-success-light",
  },
  statusDots: { Pending: "bg-warning", Completed: "bg-success", Cancelled: "bg-error", Processing: "bg-body", Active: "bg-success" },

  /** "My Orders - Order Opened" (14714:137948) and its Invoices / Shipments / Refunds tabs. */
  order: {
    number: "000000368",
    status: "Pending",
    date: "4/3/24",
    // sku links each line to the catalog product (image, product page, Reorder).
    items: [
      { sku: "14205", name: "14205 Orange polycarbonate eye shields, universal, non-sterile, packaged 100 per box", price: "$218.00", subtotal: "$218.00", qtyRefunded: 1 },
      { sku: "BCD-10", name: "BCD-10 Bipolar cord, 12', straight connector, packaged individually sterile, disposable, box of 10", price: "$120.00", subtotal: "$120.00", qtyRefunded: 2 },
      { sku: "2084E", name: "2084E Camellin style LASIK alcohol well", variant: "Size Variant: 6.5mm", price: "$324.00", subtotal: "$324.00", qtyRefunded: 1 },
    ],
    totals: [
      ["Subtotal", "$662.00"],
      ["Discount", "-$50.00"],
      ["Shipping", "$20.00"],
      ["Tax", "$41.40"],
    ],
    grandTotal: "$673.40",
    refund: { storeCredit: "- $673.40", grandTotal: "$0.00", refundedToStoreCredit: "$673.40" },
    trackingNumber: "1122334567",
    info: [
      { title: "Billing Address", lines: orderAddress },
      { title: "Shipping Address", lines: orderAddress },
      { title: "Shipping Method", lines: ["Flat Rate - Fixed"] },
      { title: "Payment Method", lines: ["Credit/Debit card"] },
    ],
    comment: { date: "May 29, 2026", text: "Please use safety cushioning material for packaging" },
  },

  /** "Your Gift Cards" (34520:102843) and the "Check Balance" result (34266:54773). */
  giftCards: [
    { number: "126566502", balance: "$260.00" },
    { number: "126566440", balance: "$500.00" },
  ],
  checkedGiftCard: { number: "126566543", balance: "$20.00", expires: "12.06.2028" },

  /** Stored Payment Methods rows (34266:59289), masked as drawn. */
  storedCards: [
    { number: "************4444", expires: "06/2027", kind: "Visa" },
    { number: "************5555", expires: "04/2028", kind: "Mastercard" },
  ],

  // Empty-state illustrations, exported from Figma as SVG:
  // "No Addresses" (23115:35474) and "illustration_empty-box" (32215:84213).
  illustrations: {
    noAddresses: "/img/illustrations/no-addresses.svg",
    emptyBox: "/img/illustrations/empty-box.svg",
  },
};
