// Data for the "pdp-cart" area: product page, cart and quick order.
// Static copy comes from the Figma frames "PDP - Simple - 1920px" (34224:49536),
// "Cart" (14714:103185) and "Quick Order - CSV Upload Summary" (34547:112188).
import catalog from "./catalog.js";
import images from "./images.js";

const { products, listingProducts } = catalog;
const bySku = Object.fromEntries(products.filter((p) => p.sku).map((p) => [p.sku, p]));

// ---------------------------------------------------------------------------
// PDP

/** The product the Figma PDP frame depicts (ITEM#: 2100E). Only it gets the extra gallery views. */
const figmaSlug = bySku["2100E"].slug;

/** Gallery image paths per product slug. Figma thumbnails: 55dde4bd (main), e2ca3b8a, 99dca01c. */
const galleries = Object.fromEntries(
  products.map((p) => [p.slug, p.slug === figmaSlug ? [p.image, images.e2ca3b8a, images["99dca01c"]] : [p.image]]),
);

/** Related products carousel: same product type first, then the cards drawn in Figma, then the listing. */
const figmaRelated = ["2100E", "5616E", "G-37400"].map((s) => bySku[s]);
const related = Object.fromEntries(
  products.map((p) => {
    const pool = [...listingProducts.filter((r) => r.type === p.type), ...figmaRelated, ...listingProducts];
    const seen = new Set([p.slug]);
    const list = [];
    for (const r of pool) {
      if (seen.has(r.slug)) continue;
      seen.add(r.slug);
      list.push(r);
      if (list.length === 20) break;
    }
    return [p.slug, list];
  }),
);

const pdp = {
  lifetimeRepair: {
    image: images["7e7cdbc9"],
    title: "Free Lifetime Repair",
    text: "Support for the life of your instrument.",
    linkLabel: "Learn More",
  },
  cleaning: {
    title: "Cleaning & Sterilization",
    text: "Explore our complete range of ophthalmic surgical instruments and equip yourself with tools that deliver unmatched precision and reliability.",
    linkLabel: "View Instructions",
  },
  // "Additional Information": Manufacturer and Product Type come from the product; the rest is Figma copy.
  attributesBeforeType: [
    ["Country of Origin:", "United States"],
    ["Provided:", "Non-Sterile"],
    ["Usage:", "Reusable"],
  ],
  attributesAfterType: [
    ["Base Material:", "Stainless Steel"],
    ["Compare To:", "Katena K3-9250 | Storz E2402"],
    ["Primary DI Number:", "00190660001698"],
  ],
  expandedDescription: [
    "The West lacrimal cannula (SKU 1124E) is a precision instrument designed for ophthalmic procedures. Manufactured by Ambler Surgical in United States, this non-sterile and reusable instrument is made from high-quality stainless steel. With specifications including a 23 gauge size, gently curved design, 0.3 mm bottom port opening, and a blunt tip, it has a total length of 30.0 mm excluding the hub.",
    "The gently curved design of the West lacrimal cannula facilitates precise navigation within delicate anatomical structures, enhancing procedural accuracy. Its blunt tip minimizes tissue trauma, supporting safer insertion and maneuvering. The 0.3 mm bottom port opening ensures controlled fluid delivery or extraction, essential for effective lacrimal duct procedures. Designed with reusable materials, this instrument promises durability and reliable performance in repeated uses.",
  ],
  keyFeatures: [
    ["Gently curved design:", "Facilitates precise navigation within delicate anatomical structures"],
    ["Blunt tip:", "Minimizes tissue trauma for safer insertion and manoeuvring"],
    ["0.3 mm bottom port opening:", "Ensures controlled fluid delivery or extraction"],
    ["23 gauge size:", "Supports precise fluid management in lacrimal duct procedures"],
    ["Reusable design:", "Offers durability and reliable performance for repeated uses"],
  ],
  returnPolicy: {
    title: "Return Policy",
    buttonLabel: "See Full Return Policy",
    intro:
      "Full credit is issued for any Ambler Surgical instrument returned within 30 days of the invoice date. Returns made 31 to 45 days after the invoice date get a 20% restocking fee. After 45 days, products can't be returned.",
    blocks: [
      {
        title: "How to return",
        text: "Call Customer Service at 610-280-7361 to get a Return Goods Authorization (RGA) number, then mark it clearly on your package. Returns sent without an RGA may be refused. Every return is inspected before credit is issued.",
      },
      {
        title: "Return condition",
        text: "Items must be unused, unaltered, unsterilized and in resalable condition, and come back with all original packaging, labels, Instructions for Use and accessories. Shipping and processing fees aren't refunded unless the return is due to our error.",
      },
      {
        title: "Other brands",
        text: "Return periods and restocking fees for other manufacturers vary, and some brands are special order and can't be returned at all. Check the full Terms and Conditions of Sale for each manufacturer's policy.",
      },
    ],
    notReturnableTitle: "Items that can't be returned",
    notReturnable: [
      "Non-sterile instruments that have been sterilized",
      "Sterile products with opened or damaged packaging",
      "Products returned more than 45 days after the invoice date",
      "Products removed from or missing their original packaging",
      "Distributed products with damaged boxes, labels or seals",
      "Custom-etched, custom-made or modified products",
      "Special-order products and non-returnable drop-ship items",
      "K-Wires, Steinmann Pins, Cerclage Wire, Distraction Screws and Gigli Saw Blades",
    ],
  },
};

// ---------------------------------------------------------------------------
// Cart: "Purchasing Requirements & Compliance" (34314:11255).

const compliance = {
  title: "Purchasing Requirements & Compliance",
  rows: [
    {
      title: "Professional use only",
      text: "The sale of the products on this website are subject to regulation by the U.S. Food and Drug Administration (FDA) and may also be subject to state and local regulatory agencies. By completing your purchase, you confirm and warrant that you are either a medical practitioner, or you are purchasing on behalf of a licensed medical facility, educational institution, government agency, or a customer that sells these products to such institutions.",
    },
    {
      title: "We may verify your order",
      text: "After placing your order, we reserve the right to request additional information from you. This information may include, but is not limited to, the name and address of the healthcare facility, or the National Provider Identifier (NPI) number for the provider you are ordering on behalf of. Please be aware that the lack of a satisfactory response may result in the delay or cancellation of your order.",
    },
    {
      title: "Compliance stays with you",
      text: "It is your responsibility to ensure compliance with all applicable regulations, and by making a purchase on this website, you acknowledge and agree to adhere to any necessary requirements imposed by the FDA or other relevant regulatory authorities.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Quick Order: simulated CSV upload ("CSV Upload Summary" 34547:112188).
// Figma shows the 3 error rows; the 12 valid lines are not drawn, so they are the
// SKUs and quantities from "Quick Order - Items Added" (34403:67202) minus 93-272
// (an error row in the summary), then the other Figma ITEM# products at qty 1.

const csvErrors = [
  { row: 2, sku: "93-272", qty: 2, reason: "SKU not found in catalog" },
  { row: 6, sku: "B93-272", qty: 0, reason: "Quantity must be 1 or greater" },
  { row: 14, sku: "-", qty: 10, reason: "Missing SKU" },
];
const csvValid = [
  ["7974E", 10], ["G-37400", 8], ["14205", 2], ["2084E", 1], ["5616E", 3],
  ["1044E", 1], ["2100E", 1], ["2252E", 1], ["BCD-10", 1], ["9-692", 1], ["6-250", 1], ["1-110", 1],
].map(([sku, qty]) => ({ sku, qty }));

export default {
  figmaSlug,
  galleries,
  related,
  pdp,
  compliance,
  quickOrder: { csvErrors, csvValid },
};
