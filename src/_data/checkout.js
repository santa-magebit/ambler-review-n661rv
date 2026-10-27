// Checkout content from the Figma "Checkout" page: "Checkout - Guest (No Express
// Checkout)" 34799:87723 / 34799:87947, "Checkout - Logged In" 34799:88544, the
// New Address and merge cart modals, SUR-359 e-mail match prompt and
// "Checkout - Guest - Express Checkout & Gift Card" 34799:90318.
// The browser gets the parts it needs through `client` (rendered as JSON on the page).
import images from "./images.js";

/** "$ 21.12": the price format drawn in the Figma checkout (space after the sign). */
const price = (n) => "$ " + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** FedEx rates listed under "Shipping Method". */
const shippingMethods = [
  { id: "ground", label: "Ground", price: 21.12 },
  { id: "express-server", label: "Express Server", price: 30.16 },
  { id: "2-day", label: "2 Day", price: 32.96 },
  { id: "2-day-am", label: "2 Day AM", price: 38.29 },
  { id: "standard-overnight", label: "Standard Overnight", price: 70.24 },
  { id: "priority-overnight", label: "Priority Overnight", price: 79.65 },
  { id: "first-overnight", label: "First Overnight", price: 132.52 },
].map((m) => ({ ...m, priceLabel: price(m.price) }));

/** Saved addresses of the signed-in customer. Figma draws the same address on both cards. */
const savedAddresses = [
  { id: "address-1", lines: ["Raymond Myers", "100 Legends Way", "Boston, Massachusetts 02114", "United States", "T: 617-624-1000"] },
  { id: "address-2", lines: ["Raymond Myers", "100 Legends Way", "Boston, Massachusetts 02114", "United States", "T: 617-624-1000"] },
];

/** Items already in the account's cart ("You're Signed In" merge cart modal 34799:89813). */
const accountCart = [
  { key: "account-cooley-vascular-carotid-clamp", name: "Cooley vascular carotid clamp", qty: 1, price: 417, image: images["0c03b05c"] },
  { key: "account-cooley-bulldog-clamp", name: "Cooley bulldog clamp", qty: 1, price: 347, image: images["2198b407"] },
].map((i) => ({ ...i, priceLabel: price(i.qty * i.price) }));

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
  "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export default {
  shippingMethods,
  savedAddresses,
  accountCart,
  accountCartCount: accountCart.reduce((n, i) => n + i.qty, 0),
  countries: ["United States"],
  states,
  /** Expiry selects of the (mock) card form. */
  months: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
  years: Array.from({ length: 11 }, (_, i) => String(2026 + i)),
  /** "Discount - $ 30.00" row of the order summary totals. */
  discount: 30,
  /** Order number on the (undesigned) success page. */
  orderNumber: "000012345",
  /** What checkout.js needs in the browser. */
  client: {
    // SUR-359: a guest typing this e-mail gets the "Looks like you already have an account" prompt.
    // It is Raymond Myers' e-mail from the My Account dashboard (14714:137050), the customer of "Checkout - Logged In".
    accountEmail: "raymond.myers@gmail.com",
    shippingMethods: shippingMethods.map(({ id, label, price }) => ({ id, label, price })),
    savedAddresses,
    accountCart: accountCart.map(({ key, name, qty, price, image }) => ({ key, name, qty, total: qty * price, image })),
    discount: 30,
  },
};
