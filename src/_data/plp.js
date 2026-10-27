// Product listing pages (area "plp"): routes, listing products, filter facets
// and the copy drawn in the Figma PLP frames. Global data `plp` in templates.
//
// Rules for the 28 listing products (catalog.listingProducts, all Ophthalmology):
// - a page lists the products that belong to it (specialty / type / product line);
// - when nothing belongs to it, it lists all 28 so no designed grid is empty;
// - counts on cards and links are the number of a page's own products and are
//   left out when it has none (the Figma numbers such as "1148 products" are mock data).
import catalog from "./catalog.js";
import images from "./images.js";
import intros from "./intros.js";

const { specialties, ophthalmologyCategories, instrumentTypes, productLines, products, listingProducts, slugify } = catalog;

const byName = (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" });
const sortByName = (list) => [...list].sort(byName);

// ---------------------------------------------------------------------------
// Visual constants (sampled from the Figma frames)

const gradients = {
  // Hero overlays: navy from the left, clear by the middle (PLP heroes 34777:58994, 34719:11294 …).
  hero: "linear-gradient(90deg, #004776 0%, rgba(0, 71, 118, 0) 57%)",
  heroWide: "linear-gradient(90deg, #004776 15%, rgba(0, 71, 118, 0) 62%)",
  // Info bands: photo on the left, navy on the right (34719:11393, 34888:121815, 34777:59028).
  band: "linear-gradient(90deg, rgba(0, 71, 118, 0) 10%, #004776 50%)",
  // 2px line under the hero title.
  titleLine:
    "linear-gradient(90deg, rgba(245, 130, 32, 0) 0%, #f58220 16%, #f58220 30%, #ffffff 50%, #f58220 70%, #f58220 84%, rgba(245, 130, 32, 0) 100%)",
};

// ---------------------------------------------------------------------------
// Instrument types

/** "Quick Select - opened" (34879:7082): the Ophthalmology instrument types. */
const ophthalmicTypeNames = [
  "Alcohol Wells", "Blade Holders", "Calipers", "Cannulas", "Capsule Polishers", "Chisels", "Choppers", "Clamps",
  "Curettes", "Cutting Blocks", "Depressors", "Dilators", "Dissectors", "Elevators", "Expressors", "Fixation Plates",
  "Fixation Rings", "Flap Smoothers", "Forceps", "Gauges", "Handpieces", "Hooks", "Injectors", "Knife Handles",
  "Knives", "Laser Instruments", "Lens Loops", "Lid Plates", "Mallets", "Manipulators", "Markers", "Miscellaneous",
  "Needle Holders", "Picks", "Probes", "Punches", "Retractors", "Rongeurs", "Rotators", "Rulers", "Scissors",
  "Serrefines", "Snares", "Spatulas", "Speculum", "Spoons", "Spuds", "Trephines", "Tubing",
];
const toType = (name) => ({ name, slug: slugify(name) });
const ophthalmicTypes = ophthalmicTypeNames.map(toType);

/** "Popular Categories" / "Popular Types" cards (34719:11304, 34723:18115), in Figma order. */
const popularTypeSlugs = ["forceps", "cannulas", "scissors", "needle-holders", "markers", "speculum", "choppers", "spatulas", "hooks", "handpieces", "knives", "clamps"];

/** Card photos drawn for those types (366x310, CROP). */
const typePhotos = {
  forceps: "c4c410a7", scissors: "0eeb23f0", "needle-holders": "c7706cf1", markers: "4e1fbba9", speculum: "408eb6d1",
  choppers: "b92bdf3f", spatulas: "637dbdfb", hooks: "796c4462", handpieces: "513dc3d7", knives: "2d1f2ca4", clamps: "ca7442a9",
};
/** Figma draws the long instruments turned to the diagonal and enlarged; the exports are straight. */
// brightness lifts the JPEGs' off-white edges so the turned rectangle does not show.
const diagonal = "transform: rotate(42deg) scale(1.7) translate(13%, 0); filter: brightness(1.04)";
const typePhotoStyle = {
  speculum: "transform: rotate(8deg) scale(1.3) translate(4%, 2%)",
  handpieces: "transform: rotate(30deg) scale(1.5) translate(-4%, 4%)",
  clamps: "transform: rotate(30deg) scale(1.5) translate(8%, 6%)",
};

/**
 * Hover descriptions on category cards (styleguide "Hover — shows description"). Cannulas and the
 * Duckworth & Kent speculum are drawn in Figma; the rest is condensed from the old amblersurgical.com
 * category, product line and meta descriptions.
 */
const typeHoverText = {
  blades: [
    "Sharp, consistent stainless steel blades for clean incisions.",
    "Available in #10, #11, #12, #15, #15C and #22 sizes to fit standard knife handles.",
  ],
  calipers: [
    "Measure distances, angles and incision depths precisely in eye surgery.",
    "Castroviejo calipers for corneal microsurgery and Braunstein fixed calipers for corneal and scleral measurements.",
  ],
  cannulas: [
    "Precision-engineered for safe fluid delivery and drainage during minimally invasive surgical procedures.",
    "Designed with a flexible, biocompatible tip to reduce tissue trauma and ensure reliable catheter placement.",
  ],
  choppers: [
    "Divide and manipulate the lens nucleus during cataract and refractive surgery.",
    "Includes Nagahara, Seibel, Nichamin and phaco choppers.",
  ],
  clamps: [
    "Occlude vessels and hold tissue securely, with a ratchet lock that keeps the grip steady hands-free.",
    "Patterns for general, cardiovascular and specialty surgery.",
  ],
  cutters: [
    "Cut wire, pins and cable cleanly in orthopedic and hand surgery.",
    "Includes wire, pin, bolt and K-wire cutters, cable cutters and a finger ring cutter.",
  ],
  dissectors: [
    "Separate tissue planes gently and precisely.",
    "Includes Olivecrona, MacDonald, Blumenthal, Lemmon and Pierse dissectors, plus R-Style spatula, micro and ball dissectors.",
  ],
  forceps: [
    "Grasp, hold and manipulate tissue with precision and control.",
    "Tissue, grasping, hemostatic and bipolar patterns, from Adson and DeBakey to Castroviejo and Utrata.",
  ],
  handpieces: [
    "Deliver irrigation and aspiration during cataract surgery.",
    "Irrigation, I/A and phaco handpieces, with professional phaco handpiece repair.",
  ],
  hooks: [
    "Retract, rotate and position tissue and lenses with a fine, controlled tip.",
    "Iris and lens hooks for cataract surgery, and skin and nerve hooks for plastic and general surgery.",
  ],
  "knife-handles": [
    "Hold surgical blades securely for controlled, precise incisions.",
    "Balanced, ergonomic handles that fit standard surgical blades.",
  ],
  knives: [
    "Make clean, controlled incisions in ophthalmic and microsurgery.",
    "Diamond, keratome, crescent and clear-cornea knives, with professional diamond knife resharpening.",
  ],
  markers: [
    "Mark tissue accurately and keep alignment precise during eye surgery.",
    "For corneal marking, toric alignment, retinal and refractive procedures.",
  ],
  "needle-holders": [
    "Grip needles securely for precise suturing in delicate procedures.",
    "Includes Castroviejo, Barraquer and Ambler's own needle holders.",
  ],
  pliers: [
    "Bend, grip and twist wire and pins with a strong, secure hold.",
    "Built for orthopedic, hand and plastic surgery.",
  ],
  scissors: [
    "Make precise cuts in delicate tissue, from iris and tenotomy scissors in eye surgery to Mayo and Metzenbaum in general surgery.",
    "Straight and curved, sharp and blunt tips, in stainless steel and lightweight titanium.",
  ],
  spatulas: [
    "Separate, sweep and support delicate tissue without cutting.",
    "Fine, polished blades for anterior segment and cataract surgery.",
  ],
  speculum: [
    "Keep the eyelids open for clear access in cataract, LASIK and retinal surgery.",
    "Barraquer, Lieberman and pediatric specula in stainless steel and titanium.",
  ],
  trays: [
    "Organize and protect instruments through cleaning and autoclave cycles.",
    "Silicone-fingered sterilization trays keep fine tips and cutting edges safe.",
  ],
  "wire-cutters": [
    "Cut K-wires, pins and wire cleanly and safely.",
    "Heavy-duty and fine patterns for orthopedic, hand and plastic surgery.",
  ],
};
/** Brand page cards: drawn per brand in Figma, otherwise the type's description. */
const brandTypeHoverText = {
  "duckworth-and-kent": {
    speculum: [
      "Keep the eyelids open and stable during ophthalmic procedures.",
      "Includes wire and solid-blade designs such as Koch-Cionni and Shepard lid specula.",
    ],
  },
};
/** Product Lines cards (old product line pages). */
const lineHoverText = {
  "ambler-surgical": [
    "Our own brand of precision instruments, selected for superior materials, ergonomic design and consistent performance.",
    "Free Lifetime Repair on most Ambler Brand ophthalmic instruments.",
  ],
  "duckworth-and-kent": [
    "A world leader in reusable titanium ophthalmic instruments, with over 60 years of engineering knowledge.",
    "Elegant, well-balanced, ergonomic handles with consistent, durable performance.",
  ],
  "ocular-instruments": [
    "Creating solutions to save sight since 1966.",
    "One of the world's largest suppliers of ophthalmic diagnostic, laser and surgical lenses, with more than 200 lenses and supporting products.",
  ],
  "volk-optical": [
    "The premier designer and manufacturer of high-quality ophthalmic lenses.",
    "Home of the double aspheric 20D, 78D and 90D lenses, the Super Series and Digital Series.",
  ],
  "mastel-precision": [
    "Ophthalmic surgical instruments since 1981, specializing in ultra-thin, reduced-angle diamond knife edges.",
    "Precise finishing for minimally invasive incisions.",
  ],
  epsilon: [
    "A leading ophthalmic products manufacturer with a wide range of precision instruments.",
    "Quality maintained at every level, from product design to after-sales support.",
  ],
  geuder: [
    "Precision eye surgery products, made in Germany for over 65 years.",
    "Surgeons in over 90 countries rely on more than 3,000 Geuder products.",
  ],
  "bovie-medical": [
    "Cautery tips, handles, pencils and accessories for clean hemostasis and precise tissue work.",
    "From fine-tip cautery and loop contouring to suction coagulation and ophthalmic burr debridement.",
  ],
};

// Every type that gets a /browse-by-type/<type>/ page: the mega menu types, the
// Ophthalmology quick-select list and the types of the listing products.
const allTypes = sortByName(
  Array.from(
    new Map(
      [...instrumentTypes, ...ophthalmicTypes, ...listingProducts.map((p) => ({ name: p.typeName, slug: p.type }))].map((t) => [t.slug, t]),
    ).values(),
  ),
);
const typeName = (slug) => allTypes.find((t) => t.slug === slug)?.name ?? slug;

// ---------------------------------------------------------------------------
// Filter facets, derived from each product's name, item data and description.

const eponyms = [
  "Bishop-Harmon", "Calladine-Inamura", "Fine-Thornton", "Koch-Cionni", "Braunstein", "Castroviejo", "Lieberman",
  "Westcott", "Pierse", "Barrett", "Sinskey", "Mackool", "Shepard", "Cionni", "Vannas", "Camellin", "Derf",
];
const title = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function facetsOf(p) {
  const desc = p.description || "";
  const segs = desc.split(/,\s*/).map((s) => s.trim().toLowerCase());
  const f = { type: [p.typeName], manufacturer: [p.brandName] };

  const name = eponyms.find((e) => new RegExp(`\\b${e}\\b`).test(p.name));
  if (name) f.name = [name];

  f.material = [/titanium/i.test(desc) ? "Titanium" : /plastic|polycarbonate/i.test(p.name) ? "Plastic" : "Unspecified"];

  const handle = [];
  if (/round handle/i.test(desc)) handle.push("Round");
  if (/flat handle/i.test(desc)) handle.push("Flat");
  if (handle.length) f.handle = handle;

  const shaft = new Set();
  const tip = new Set();
  for (const s of segs) {
    if (/\btips?\b/.test(s)) {
      for (const k of ["sharp", "blunt", "notched", "angled", "straight"]) if (s.includes(k)) tip.add(title(k));
    } else if (/shafts?\b|blades\b/.test(s) || /^(\d+º )?(curved|angled|straight|vaulted)$/.test(s)) {
      for (const k of ["vaulted", "angled", "curved", "straight"]) if (s.includes(k)) shaft.add(title(k));
    }
  }
  f.shaft = shaft.size ? [...shaft] : ["Unspecified"];
  if (tip.size) f.tip = [...tip];

  const jaw = [];
  if (/teeth/i.test(desc)) jaw.push("Teeth");
  if (/tying platforms/i.test(desc)) jaw.push("Tying Platforms");
  if (/smooth jaws/i.test(desc)) jaw.push("Smooth Jaws");
  if (jaw.length) f.jaw = jaw;

  const length = segs.map((s) => s.match(/^(\d+(?: \d+\/\d+)?)(?:''|")$/)).find(Boolean);
  if (length) f.length = [`${length[1]}"`];
  const gauge = desc.match(/(\d+) gauge/i);
  if (gauge) f.gauge = [`${gauge[1]} Gauge`];

  return f;
}

/** Filter panel: attributes (left list) with their checkbox groups (Figma "filters - opened" 34793:65207). */
const attributes = [
  { key: "type", label: "Type", groups: [{ key: "type", label: "Type" }] },
  { key: "name", label: "Name", groups: [{ key: "name", label: "Name" }] },
  { key: "manufacturer", label: "Manufacturer", groups: [{ key: "manufacturer", label: "Manufacturer" }] },
  { key: "material", label: "Base Material", groups: [{ key: "material", label: "Base Material" }] },
  { key: "handle", label: "Handle Features", groups: [{ key: "handle", label: "Handle Style" }, { key: "shaft", label: "Shaft Pattern" }] },
  { key: "jaw", label: "Jaw Features", groups: [{ key: "jaw", label: "Jaw Features" }] },
  { key: "tip", label: "Tip Features", groups: [{ key: "tip", label: "Tip Features" }] },
  { key: "measure", label: "Measurements", groups: [{ key: "length", label: "Length" }, { key: "gauge", label: "Gauge" }] },
];

const facets = Object.fromEntries(products.map((p) => [p.slug, facetsOf(p)]));
const keysOf = (p) => Object.entries(facets[p.slug]).flatMap(([g, vals]) => vals.map((v) => `${g}:${v}`));

const lengthValue = (v) => v.replace('"', "").split(" ").reduce((n, part) => n + (part.includes("/") ? part.split("/")[0] / part.split("/")[1] : Number(part)), 0);
function sortOptions(groupKey, opts) {
  if (groupKey === "length") return opts.sort((a, b) => lengthValue(a.value) - lengthValue(b.value));
  if (groupKey === "gauge") return opts.sort((a, b) => parseInt(a.value) - parseInt(b.value));
  return opts.sort((a, b) => (a.value === "Unspecified") - (b.value === "Unspecified") || b.count - a.count || a.value.localeCompare(b.value));
}

/** The filter panel for a set of products: attributes and groups with options present in the set. */
function buildFilters(list) {
  return attributes
    .map((a) => ({
      ...a,
      groups: a.groups
        .map((g) => {
          const counts = new Map();
          for (const p of list) for (const v of facets[p.slug][g.key] || []) counts.set(v, (counts.get(v) || 0) + 1);
          const options = sortOptions(g.key, [...counts].map(([value, count]) => ({ value, count, key: `${g.key}:${value}`, label: `${g.label}: ${value}` })));
          return { ...g, options };
        })
        .filter((g) => g.options.length),
    }))
    .filter((a) => a.groups.length);
}

/**
 * A product listing (filters + toolbar + grid + pagination).
 * cfg goes to Alpine.data("plpListing"); items carry each product's facet keys.
 */
function listing(list, { title: listTitle, perPage = 20, filters = true, id = "products", search = false } = {}) {
  const sorted = sortByName(list);
  const panel = filters ? buildFilters(sorted) : [];
  return {
    id,
    products: sorted,
    filters: panel,
    perPage,
    cfg: {
      title: listTitle,
      perPage,
      active: (panel[0] || {}).key || null,
      attributes: panel.map((a) => ({ key: a.key, groups: a.groups.map((g) => g.key) })),
      search,
      groups: Object.fromEntries(panel.flatMap((a) => a.groups.map((g) => [g.key, g.label]))),
      items: sorted.map((p) => ({ s: p.slug, f: keysOf(p) })),
    },
  };
}

/** A page's own listing products, or all 28 when it has none. */
function productsFor(predicate) {
  const own = listingProducts.filter(predicate);
  return { own, list: own.length ? own : listingProducts };
}

// ---------------------------------------------------------------------------
// Copy from the Figma frames

const trust = [
  { icon: "award", title: "Specialists Since 1997", text: "Providing high-quality surgical instruments for over 25 years." },
  { icon: "truck-delivery", title: "Fast, Reliable Shipping", text: "Orders ship quickly and arrive on time." },
  { icon: "headphones", title: "Dedicated Customer Support", text: "Real people. Quick answers. Expert guidance." },
  { icon: "shield-check", title: "Free Lifetime Repair", text: "Included with most Ambler ophthalmic instruments." },
];

const materialsAnswer = [
  "Titanium: Highly preferred because it is lightweight (reducing hand fatigue during microsurgery), non-magnetic, and extremely resistant to corrosion.",
  "Stainless Steel: Widely used for its durability, strength, and ability to hold exceptionally sharp edges for cutting instruments.",
  "Tungsten Carbide: Often used as inserts in the tips of scissors or the jaws of needle holders to provide extra hardness, longevity, and a secure grip.",
  "Medical-Grade Plastics: Used for disposable, single-use instruments.",
];
// FAQ answers from the old site: the Ophthalmology page FAQ (amblersurgical.com/browse-by-specialty/ophthalmology),
// its instrument category copy and the cleaning & sterilization IFU. Figma draws only the materials answer.
const sterilizeAnswer = [
  "Reusable ophthalmic instruments are typically sterilized via steam autoclave (134°C for 3–4 minutes, or 121°C for 15 minutes) following thorough manual cleaning or ultrasonic bath decontamination.",
  "Instruments with delicate tips, such as forceps, needle holders, or diamond knives should be placed in silicone-fingered instrument trays to protect cutting edges and fine tips during the autoclave cycle. Ambler Surgical carries a full range of sterilization trays, cleaning brushes, disinfectant solutions, and instrument guards to support proper SPD workflow.",
  "Diamond knives require special handling and should never be autoclaved; Ambler's professional resharpening service restores them instead.",
];
const cataractTrayAnswer = [
  "A typical cataract surgery tray includes a lid speculum (e.g., Lieberman or Barraquer), a fixed caliper (e.g., Braunstein), a clear-cornea or keratome knife, a crescent blade, Castroviejo suturing forceps, a chopper or second instrument, iris hooks or a capsular tension ring injector (e.g., RingJect™ CTR), a Westcott tenotomy scissor, and an I/A handpiece.",
  "Exact tray composition varies by surgeon preference and technique (phaco vs. MSICS). Ambler Surgical carries all of these individually, and the cross-reference catalog search lets you match any current catalog number to find compatible replacements in seconds.",
];
const repairAnswer = [
  "Yes, and it's one of our strongest differentiators. Ambler offers free lifetime repair on most Ambler-brand ophthalmic instruments, covering the full service life of the tool.",
  "Paid repair services are also available for diamond knives (resharpening and re-tipping), phaco handpieces, cryosurgical handpieces, micro instruments, and surgical/diagnostic lenses. For OR managers and ASC buyers, this significantly lowers total cost of ownership compared to disposable-only or no-warranty alternatives.",
];
const faq = {
  // Specialty, Category and Forceps frames (34777:59083, 34719:11514, 34887:118753).
  general: [
    { q: "How do you sterilize ophthalmic surgical instruments?", a: sterilizeAnswer },
    { q: "What instruments are included in a standard cataract surgery tray?", a: cataractTrayAnswer },
    { q: "What materials are ophthalmic surgical instruments made of?", a: materialsAnswer },
    { q: "Does Ambler Surgical offer repair services for ophthalmic instruments?", a: repairAnswer },
  ],
  // Product Type Page (34723:17357).
  instruments: [
    {
      q: "What are ophthalmic instruments used for?",
      a: [
        "Ophthalmic surgical instruments are built for microsurgical accuracy in both anterior and posterior segment procedures: cataract, corneal, glaucoma, retinal, refractive, and oculoplastic surgery.",
        "Each type has its own job in the tray: speculums hold the lids open, calipers and markers measure and mark the cornea, knives and blades make the incisions, forceps and hooks grasp and manipulate tissue, sutures and lenses, scissors cut, and cannulas and I/A tips irrigate and aspirate.",
      ],
    },
    {
      q: "What are the key features of ophthalmic instruments?",
      a: [
        "Each instrument is selected for superior materials, ergonomic design, and consistent performance, and held to microsurgical tolerances where tip geometry is measured in microns.",
        "You get controlled handling, clear visibility, and a consistent feel, case after case. Stainless steel and titanium options hold alignment through repeated autoclave cycles, while balanced profiles and finely finished tips help you work confidently in cataract, cornea, retina, glaucoma, and oculoplastic surgery.",
      ],
    },
    { q: "How do I choose between stainless steel and titanium instruments?", a: materialsAnswer },
    {
      q: "Are these instruments reusable and autoclavable?",
      a: [
        "Yes. Ambler Surgical's reusable instruments are provided non-sterile and must be inspected, cleaned, and sterilized before first use and before every reuse. They are typically sterilized via steam autoclave (134°C for 3–4 minutes, or 121°C for 15 minutes) after thorough manual or ultrasonic cleaning.",
        "Repeated reprocessing has minimal effect on the instrument life: the end of useful life for metal surgical instruments is normally determined by wear and damage from surgical use. Diamond knives should never be autoclaved, and disposable instruments are for single use only.",
      ],
    },
  ],
};

const repairBanner = { title: "Free Lifetime Repair", text: "Free repair on most Ambler Surgical brand ophthalmic instruments", cta: "Learn More", href: "/repair-services/" };

/** Ophthalmology specialty page (34777:58990). */
const ophthalmologyPage = {
  // "Shop By Categories" card photos as drawn on this frame (Figma order).
  categories: [
    { slug: "instruments", image: "1907881e", position: "top" },
    // Drawn rotated in Figma.
    { slug: "disposables", image: "becc0b30", fit: "contain", style: "transform: translate(3%, 6%) rotate(27deg) scale(1.15)" },
    { slug: "diamond-knives", image: "75819727" },
    { slug: "specialty", image: "35ef7b05", fit: "contain" },
  ],
  band: {
    figma: "34777:59028",
    image: "5701dcf9",
    title: "Premium Ophthalmic Surgical Instruments & Supplies",
    accent: "Precision Tools for Every Eye Procedure",
    paragraphs: [
      "Ambler Surgical offers one of the industry’s most comprehensive catalogs of ophthalmic surgical instruments and products designed for microsurgical accuracy in cataract, corneal, glaucoma, retinal, refractive, and oculoplastic procedures. Each instrument is selected for superior materials, ergonomic design, and consistent performance, helping surgeons work with confidence and precision.",
      "Whether you’re sourcing diamond knives, forceps, speculums, phaco handpieces, disposables, or specialty lenses, you’ll find high-quality options at transparent pricing — with a powerful cross-reference tool to match other manufacturers’ catalog numbers in seconds. Ambler Surgical also provides Free Lifetime Repair on most Ambler Brand ophthalmic instruments, reducing lifecycle costs and ensuring your tools stay dependable.",
      "Explore our instrument categories to quickly find what you need, or contact our expert support team for help with product selection and technical questions.",
    ],
  },
};

/** Ophthalmology > Instruments category page (34719:11290). */
const ophthalmicInstruments = {
  heroText:
    "At Ambler Surgical, our ophthalmic surgical instruments are built for microsurgical accuracy in both anterior and posterior segment procedures. You get controlled handling, clear visibility, and a consistent feel, case after case. Stainless steel and titanium options hold alignment through repeated autoclave cycles, while balanced profiles and finely finished tips help you work confidently in cataract, cornea, retina, glaucoma, and oculoplastic surgery.",
  band: {
    figma: "34719:11393",
    image: "c2747fef",
    title: "Ophthalmic Instruments for Various Eye Procedures",
    paragraphs: ["Our eye surgery instruments support precise tissue handling and controlled access across ophthalmic procedures, including:"],
    bullets: [
      "Cataract extraction and phacoemulsification",
      "Corneal transplantation (DMEK/DSAEK/PK)",
      "Keratorefractive flap creation and retreatment",
      "Oculoplastic and eyelid surgery",
      "Strabismus and extraocular muscle surgery",
      "Lacrimal and DCR procedures",
    ],
  },
  features: {
    figma: "34719:11433",
    title: "Features of our Ophthalmic Instruments",
    intro: "Precision matters in every eye surgery. That's why Ambler Surgical forceps are made from durable stainless steel and built to perform in every procedure.",
    items: [
      ["Microsurgical Ergonomics", "Low-profile shafts, balanced handles, and glare-reduced finishes that improve control under the microscope."],
      ["Purpose-Built Tips & Edges", "Utrata- and Colibri-style forceps, Westcott and Vannas blades, and other profiles tuned for precise grasping, cutting, and dissection."],
      ["Surgical-Grade Materials", "Stainless steel for longevity; titanium for lighter weight and corrosion resistance; non-stick/insulated options for bipolar forceps."],
      ["Clear Sizing & Markings", "Etched gauges and reference marks on calipers and forceps help standardize steps like capsulorhexis sizing."],
      ["Autoclavable Construction", "Durable joints and smooth finishes that can withstand repeated [sterilization](/sterilization-cleaning/) without loss of alignment."],
    ],
  },
  typesOf: {
    figma: "34719:11450",
    title: "Types of Ophthalmic Instruments",
    intro: "Our selection covers every critical step in eye surgery. Below are five core categories, each optimized for control, access, and tissue respect:",
    cards: [
      { title: "Ophthalmic Forceps", type: "forceps", text: "Capsulorhexis, corneal, tying, and fixation patterns deliver secure, low-trauma grasping (e.g., Utrata, Bishop-Harmon, Colibri)." },
      { title: "Ophthalmic Cannulas", type: "cannulas", text: "Hydrodissection, irrigation/aspiration, and infusion designs provide targeted flow with gentle interface control (e.g., Simcoe, McIntyre, Nichamin)." },
      { title: "Ophthalmic Scissors", type: "scissors", text: "Westcott, Vannas, and corneal section profiles create clean, predictable cuts for capsulotomy, conjunctiva, and fine tissue planes." },
      { title: "Ophthalmic Speculum", type: "speculum", text: "Wire and solid-blade designs maintain stable exposure with comfortable lid contact throughout microscope-guided steps." },
      { title: "Ophthalmic Needle Holders", type: "needle-holders", text: "Castroviejo and Barraquer styles ensure steady, low-play needle control for delicate ophthalmic suturing." },
      { title: "Ophthalmic Manipulators", type: "manipulators", text: "Lens and nucleus manipulators, Sinskey hooks, lens dialers, phaco manipulators, LASIK instruments, and more." },
    ],
    outro: "Explore our complete range of ophthalmic surgical instruments and equip yourself with tools that deliver unmatched precision and reliability.",
  },
};

/** Ophthalmology > Instruments > Forceps type page (34723:17020). */
const ophthalmicForceps = {
  heroText:
    "Ophthalmic forceps are specialized surgical tools used to grasp, hold, and manipulate delicate tissues during eye surgeries. At Ambler Surgical, we offer a wide range of ophthalmic forceps types designed for delicate procedures. Whether you're performing cataract surgery, corneal transplants, or refractive surgeries, our forceps provide the precision and control needed for the best patient outcomes.",
  band: {
    figma: "34723:17235",
    image: "93e4ccd4",
    title: "Eye Forceps for Various Ophthalmic Procedures",
    paragraphs: ["We offer various ophthalmic forceps used in many different ophthalmic surgeries, including:"],
    bullets: ["Cataract Surgery", "LASIK and Refractive Surgeries", "Retinal and Vitreous Surgery", "Corneal Transplants", "Pediatric Ophthalmology"],
  },
  features: {
    figma: "34723:17272",
    title: "Features of our Ophthalmic Forceps",
    intro: "We understand that precision is essential in every eye surgery. That's why Ambler Surgical forceps are crafted from durable stainless steel and designed for superior functionality. Key features include:",
    items: [
      ["High-Quality Materials", "Our forceps are made from premium stainless steel, with titanium options available for lighter weight and improved strength."],
      ["High-Precision Tips", "Perfect for gripping delicate tissues during surgeries."],
      ["Ergonomic Handles", "For a comfortable, secure grip, reducing hand fatigue during extended surgeries."],
      ["Variety of Blade Types", "Including Castroviejo forceps, [bipolar forceps](/browse-by-type/forceps/), and more, designed to accommodate different surgical techniques."],
      ["Lightweight Construction", "Ensuring ease of use, even in intricate procedures."],
      ["Non-Reflective Surfaces", "Reducing glare for improved visibility during operations."],
      ["Trusted Manufacturers", "Learn more about [Geuder](/product-lines/geuder/) and [Duckworth & Kent](/product-lines/duckworth-and-kent/) on their official websites."],
    ],
  },
  typesOf: {
    figma: "34723:17293",
    title: "Types of Ophthalmic Forceps",
    intro: "Our selection covers every critical step in eye surgery. Below are five core categories, each optimized for control, access, and tissue respect:",
    cards: [
      { title: "Capsulorhexis Forceps", text: "Designed specifically for capsulorhexis procedures, allowing for precise and controlled opening of the anterior lens capsule during cataract surgery." },
      { title: "Tying Forceps", text: "Used for tying sutures securely, offering precision and control when performing intricate knot-tying in eye surgeries." },
      { title: "Castroviejo Forceps", filter: "name:Castroviejo", text: "A favorite for microsurgical procedures, often used in corneal and retinal surgeries due to their precise grip." },
      { title: "Suturing Forceps", text: "Ideal for precise suturing during corneal transplants, cataract surgeries, and other delicate ophthalmic procedures." },
      { title: "Utrata Forceps", text: "Often used in capsulorhexis procedures for holding and manipulating the capsule during cataract surgery." },
      { title: "MICS Forceps", text: "Designed for microincision cataract surgery, offering precise control and delicate tissue manipulation through smaller incisions." },
    ],
    outro: "Explore our full range of [ophthalmic surgical instruments](/browse-by-specialty/ophthalmology/instruments/) and equip yourself with the highest-quality tools that deliver unparalleled precision and reliability.",
  },
};

/** Browse by Type > Forceps (34887:118658). */
const forcepsType = {
  heroText: intros.pages.forceps,
  subtypes: [
    {
      name: "Bipolar",
      image: "66e4e59f",
      hover: [
        "Confine current between the tips for precise coagulation with minimal collateral damage.",
        "Adson, bayonet, fenestrated and Malis-type designs for neuro, ENT and microsurgery.",
      ],
    },
    {
      name: "Grasping",
      image: "9d8ed65f",
      fit: "contain",
      style: "transform: rotate(37deg) scale(1.45) translate(4%, 0)",
      hover: [
        "Hold tissue securely yet gently, from a firm grip to sensitive organs.",
        "Toothed Allis for tough fascia, atraumatic Babcock and bowel graspers for delicate structures.",
      ],
    },
    {
      name: "Obstetrical",
      image: "a53e626f",
      hover: [
        "Smooth, atraumatic surfaces and ergonomic handles for confident control in forceps deliveries.",
        "Includes Simpson, Piper and Kielland forceps.",
      ],
    },
    {
      name: "Tissue",
      image: "7291b38f",
      hover: [
        "Complete control when handling tissue, for safe and effective surgery.",
        "Allis, Babcock, Adson, Allis-Judd and Lockwood-Allis tissue forceps.",
      ],
    },
  ],
  band: {
    figma: "34888:121815",
    image: "6aae2b57",
    title: "Surgical Forceps for Every Specialty",
    accent: "From Everyday Essentials to Specialty Patterns.",
    paragraphs: [
      "Ambler Surgical offers the right surgical forceps for any type of medical specialty. Our large catalog of medical forceps has tools for every need, from heart surgery with reliable DeBakey forceps to plastic surgery with fine-pointed Adson forceps.",
      "We also stock such tools as biopsy and tenaculum forceps for gynecology, and specialized alligator forceps for ENT procedures, making us your one-stop source for surgical forceps.",
    ],
  },
  seo: {
    figma: "34887:119159",
    title: "Surgical Forceps Made for Precision",
    paragraphs: [
      "At Ambler Surgical, every forcep is made for precision, chosen carefully to give surgeons excellent control and feel. Our tools are ergonomic, durable, and can be trusted through many cleanings, making them a key part of any operating room.",
      "This precision can be seen in every tool, from the tight grip of hemostatic forceps to stop bleeding, to the gentle touch of tissue forceps, and obstetrical forceps for safety in the delivery room. Browse our complete forceps catalog to find instruments that ensure the great accuracy required in surgery.",
    ],
  },
};

/** Product Lines page (34907:8363). */
const productLinesPage = {
  eyebrow: "Explore and Browse Instruments",
  title: "by Product Lines",
  heroText:
    "Ambler Surgical is proud to be a distributor for some of the biggest names in ophthalmic instruments and products, including Duckworth & Kent, Volk Optical, Ocular Instruments, Mastel Precision, Bovie Medical and many more. If you order ophthalmic instruments and specialty ophthalmic products, you could be saving money by ordering those products from Ambler Surgical.",
  // "Popular Product Lines" cards (photo per line).
  popular: [
    ["ambler-surgical", "cd1d303a"], ["duckworth-and-kent", "b7a3c44f"], ["ocular-instruments", "eb36808d"], ["volk-optical", "2df98bc7"],
    ["mastel-precision", "5d62af3b"], ["epsilon", "a5e4aafa"], ["geuder", "5266a0eb"], ["bovie-medical", "88a31f74"],
  ],
};

/** Brand page hero copy (34926:9036); only Duckworth & Kent is drawn. */
const brandHero = {
  "duckworth-and-kent":
    "A world leader in reusable titanium ophthalmic surgical instrumentation. Their product ranges represent cutting edge technology fused with over 60 years of engineering knowledge. Their instruments offer surgeons and elegant, well balanced and ergonomically designed handle while still providing high quality, consistent and durable functionality.",
};

/** Logo widths as drawn on the brand tiles (the PNGs are 2x). */
const logoWidths = {
  "ambler-surgical": 165, "duckworth-and-kent": 67, "ocular-instruments": 151, surgistar: 134, "volk-optical": 141,
  "aspen-surgical": 174, "ellman-international": 117, epsilon: 135, "mastel-precision": 147, geuder: 141, rumex: 162,
  "oculo-plastik": 175, "bovie-medical": 130,
};

/** Logos: the catalog's exports, plus the Bovie logo drawn on the Product Lines frame. */
const logoOf = (b) => b.logo || (b.slug === "bovie-medical" ? images.e3e99089 : null);
const lines = productLines.map((b) => ({ ...b, logo: logoOf(b) }));

// ---------------------------------------------------------------------------
// Cards

const ownCount = (pred) => listingProducts.filter(pred).length;

/** Category card for an instrument type (photo, or the photo of one of its products). */
function typeCard(t, href, count, extra = {}) {
  const photo = typePhotos[t.slug];
  const product = listingProducts.find((p) => p.type === t.slug);
  return {
    name: t.name,
    slug: t.slug,
    href,
    count,
    image: photo ? images[photo] : product ? product.image : images["1907881e"],
    fit: photo || product ? "contain" : "cover",
    position: photo || product ? null : "top",
    style: photo ? typePhotoStyle[t.slug] || diagonal : null,
    hover: typeHoverText[t.slug] || null,
    ...extra,
  };
}

// ---------------------------------------------------------------------------
// Pages

const crumbsSpecialty = (s) => [{ label: "Browse by Specialty", href: "/browse-by-specialty/" }, { label: s.name, href: s.url }];

/** Categories under a specialty: Ophthalmology's four, one "Instruments" for the others. */
const categoriesOf = (s) =>
  s.slug === "ophthalmology" ? ophthalmologyCategories.map((c) => ({ name: c.name, slug: c.slug })) : [{ name: "Instruments", slug: "instruments" }];

/** Instrument types under a specialty's "Instruments" category. */
const typesOf = (s) => (s.slug === "ophthalmology" ? ophthalmicTypes : s.types);

const inSpecialty = (s) => (p) => p.specialties.includes(s.slug);

const specialtyPages = specialties.map((s) => {
  const isOph = s.slug === "ophthalmology";
  const { list } = productsFor(inSpecialty(s));
  const instrumentsUrl = `${s.url}instruments/`;
  const typeMenu = typesOf(s).map((t) => ({ label: t.name, href: `${instrumentsUrl}${t.slug}/` }));
  const categories = isOph
    ? ophthalmologyPage.categories.map((c) => {
        const cat = ophthalmologyCategories.find((x) => x.slug === c.slug);
        return { title: cat.name, href: `${s.url}${c.slug}/`, image: images[c.image], fit: c.fit || "cover", position: c.position, style: c.style, menu: c.slug === "instruments" ? typeMenu : [] };
      })
    : (() => {
        // Each group card shows a photo of one of its types, a different one per card where possible.
        const used = new Set();
        return s.groups.map((g) => {
          const slugs = g.items.map(slugify).filter((slug) => typePhotos[slug]);
          const pick = slugs.find((slug) => !used.has(slug)) || slugs[0];
          if (pick) used.add(pick);
          return {
            title: g.title,
            href: instrumentsUrl,
            image: images[pick ? typePhotos[pick] : "1907881e"],
            fit: pick ? "contain" : "cover",
            position: pick ? null : "top",
            style: pick ? typePhotoStyle[pick] || diagonal : null,
            menu: g.items.map((name) => ({ label: name, href: `${instrumentsUrl}${slugify(name)}/` })),
          };
        });
      })();
  return {
    name: s.name,
    slug: s.slug,
    url: s.url,
    isOph,
    breadcrumbs: [{ label: "Browse by Specialty", href: "/browse-by-specialty/" }, { label: s.name }],
    description: s.description,
    hero: { title: s.name, text: intros.specialties[s.slug] || s.description, image: "21fc3c67" },
    categories,
    products: list,
    popularCount: 8,
    band: isOph ? ophthalmologyPage.band : null,
  };
});

const categoryPages = specialties.flatMap((s) =>
  categoriesOf(s).map((c) => {
    const isOph = s.slug === "ophthalmology";
    const url = `${s.url}${c.slug}/`;
    const isInstruments = c.slug === "instruments";
    const types = isInstruments ? typesOf(s) : [];
    const typeUrl = (t) => `${url}${t.slug}/`;
    const countFor = (t) => ownCount((p) => inSpecialty(s)(p) && p.type === t.slug);
    // Ophthalmology shows the twelve Figma cards; other specialties show their types, photographed ones first.
    let cardTypes = [];
    if (isInstruments && isOph) cardTypes = popularTypeSlugs.map((slug) => types.find((t) => t.slug === slug));
    else if (isInstruments) cardTypes = [...types.filter((t) => typePhotos[t.slug]), ...types.filter((t) => !typePhotos[t.slug])].slice(0, 12);
    const { list } = productsFor((p) => inSpecialty(s)(p) && isInstruments);
    const extras = isOph && isInstruments ? ophthalmicInstruments : null;
    return {
      specialty: { name: s.name, slug: s.slug, url: s.url },
      name: c.name,
      slug: c.slug,
      url,
      isOph,
      breadcrumbs: [...crumbsSpecialty(s), { label: c.name }],
      hero: { eyebrow: s.name, title: c.name, text: extras ? extras.heroText : intros.categories[`${s.slug}/${c.slug}`], image: "be970610", flip: true, wide: true },
      cards: cardTypes.map((t) => typeCard(t, typeUrl(t), countFor(t))),
      quickSelect: types.map((t) => ({ label: t.name, href: typeUrl(t) })),
      products: list,
      popularCount: 12,
      extras: extras
        ? { ...extras, typesOf: { ...extras.typesOf, cards: extras.typesOf.cards.map((k) => ({ ...k, href: `${url}${k.type}/` })) } }
        : null,
    };
  }),
);

const typePages = specialties.flatMap((s) =>
  typesOf(s).map((t) => {
    const isOph = s.slug === "ophthalmology";
    const url = `${s.url}instruments/${t.slug}/`;
    const extras = isOph && t.slug === "forceps" ? ophthalmicForceps : null;
    const { own, list } = productsFor((p) => inSpecialty(s)(p) && p.type === t.slug);
    return {
      specialty: { name: s.name, slug: s.slug, url: s.url },
      name: t.name,
      slug: t.slug,
      url,
      ownCount: own.length,
      breadcrumbs: [...crumbsSpecialty(s), { label: "Instruments", href: `${s.url}instruments/` }, { label: t.name }],
      hero: extras
        ? { eyebrow: s.name, title: t.name, text: extras.heroText, image: "aac4f963", placement: "right", wide: true }
        : { eyebrow: s.name, title: t.name, text: intros.typeIntro(t, s), image: "be970610", flip: true, wide: true },
      listing: listing(list, { title: t.name }),
      faq: faq.instruments,
      extras,
    };
  }),
);

const browseTypes = allTypes.map((t) => {
  const isForceps = t.slug === "forceps";
  const { own, list } = productsFor((p) => p.type === t.slug);
  const names = [...new Set(own.flatMap((p) => facets[p.slug].name || []))].sort().map((n) => ({
    name: n,
    key: `name:${n}`,
    count: own.filter((p) => (facets[p.slug].name || []).includes(n)).length,
  }));
  return {
    name: t.name,
    slug: t.slug,
    url: `/browse-by-type/${t.slug}/`,
    ownCount: own.length,
    breadcrumbs: [{ label: "Browse by Type", href: "/browse-by-type/" }, { label: t.name }],
    hero: isForceps
      ? { title: t.name, text: forcepsType.heroText, image: "aac4f963" }
      : { title: t.name, text: intros.typeIntro(t), image: "be970610", flip: true, wide: true },
    subtypes: isForceps ? forcepsType.subtypes.map((x) => ({ ...x, image: images[x.image] })) : [],
    names,
    listing: listing(list, { title: t.name }),
    band: isForceps ? forcepsType.band : null,
    seo: isForceps ? forcepsType.seo : null,
  };
});

const brandPages = lines.map((b) => {
  const { own, list } = productsFor((p) => p.brand === b.slug);
  // Popular categories: the types of the line's own products, most products first.
  const types = [...new Set(own.map((p) => p.type))]
    .map((slug) => ({ slug, name: typeName(slug), count: own.filter((p) => p.type === slug).length }))
    .sort((a, b2) => b2.count - a.count || a.name.localeCompare(b2.name))
    .slice(0, 8);
  const hover = brandTypeHoverText[b.slug] || {};
  return {
    ...b,
    ownCount: own.length,
    breadcrumbs: [{ label: "Product Lines", href: "/product-lines/" }, { label: b.name }],
    hero: { title: b.name, text: brandHero[b.slug] || intros.brands[b.slug] || null, image: "bdd345e8", placement: "right", wide: true },
    cards: types.map((t) => {
      const product = own.find((p) => p.type === t.slug);
      return {
        name: t.name,
        slug: t.slug,
        count: t.count,
        href: `/browse-by-type/${t.slug}/?manufacturer=${encodeURIComponent(b.name)}`,
        image: product.image,
        fit: "contain",
        hover: hover[t.slug] || typeHoverText[t.slug] || null,
      };
    }),
    quickSelect: types.map((t) => ({ label: t.name, href: `/browse-by-type/${t.slug}/?manufacturer=${encodeURIComponent(b.name)}` })),
    listing: listing(list, { title: b.name, filters: false }),
  };
});

const featuredLines = ["ambler-surgical", "duckworth-and-kent", "ocular-instruments", "volk-optical"];
const productLinePage = {
  ...productLinesPage,
  popular: productLinesPage.popular.map(([slug, image]) => {
    const b = lines.find((x) => x.slug === slug);
    return { name: b.name, href: b.url, image: images[image], count: ownCount((p) => p.brand === slug), hover: lineHoverText[slug] || null };
  }),
  // "All Product Lines" in the drawn "Featured" order: four lines first, then A to Z.
  all: [...featuredLines.map((slug) => lines.find((b) => b.slug === slug)), ...sortByName(lines.filter((b) => !featuredLines.includes(b.slug)))].map(
    (b) => ({ name: b.name, slug: b.slug, url: b.url, logo: b.logo }),
  ),
};

/** Browse by Type index (34723:18102). */
const browseTypeIndex = {
  popular: popularTypeSlugs.map((slug) => {
    const t = allTypes.find((x) => x.slug === slug);
    return typeCard(t, `/browse-by-type/${slug}/`, ownCount((p) => p.type === slug));
  }),
  letters: Object.entries(
    allTypes.reduce((acc, t) => {
      (acc[t.name[0].toUpperCase()] ||= []).push({ name: t.name, url: `/browse-by-type/${t.slug}/`, count: ownCount((p) => p.type === t.slug) });
      return acc;
    }, {}),
  ).map(([letter, items]) => ({ letter, items })),
};

/** Search results: every catalog product can match (the header search uses the same set). */
const search = listing(products, { title: "results", id: "search-results", search: true });

export default {
  gradients,
  logoWidths,
  trust,
  faq,
  repairBanner,
  topLines: lines.filter((b) => b.logo).slice(0, 12),
  specialtyPages,
  categoryPages,
  typePages,
  browseTypes,
  browseTypeIndex,
  brandPages,
  productLinePage,
  search,
};
