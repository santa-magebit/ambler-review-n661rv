// Catalogue for the prototype (Eleventy global data: `catalog` in templates,
// window.CATALOG in the browser). Names, item numbers, descriptions, prices and
// images come from the Figma file "Ambler design - Venta - 2026" (PLP, PDP,
// Cart and Search pages). Specialty descriptions and mega-menu groups come from
// the Landing Page and Mega Menu frames.
import images from "./images.js";

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Specialties (Browse by Specialty). `groups` = mega menu columns.

const specialtyList = [
  {
    name: "Ophthalmology",
    slug: "ophthalmology",
    description: "High-quality tools for cataracts, corneal transplants, and retinal surgeries",
    viewAllLabel: "View All Ophthalmology",
    groups: [
      { title: "Cutting and Dissection", items: ["Choppers", "Knives", "Knife Handles", "Punches", "Scissors", "Trephines"] },
      { title: "Gripping and Suturing", items: ["Clamps", "Forceps", "Needle Holders", "Serrefines"] },
      { title: "Retraction and Access", items: ["Depressors", "Hooks", "Lid Plates", "Retractors", "Speculum"] },
      { title: "Measuring and Diagnostic", items: ["Calipers", "Gauges", "Markers", "Probes", "Rulers"] },
    ],
  },
  {
    name: "Plastic Surgery",
    slug: "plastic-surgery",
    description: "Plastic surgery tools for facelifts, breast reconstruction, and liposuction",
    viewAllLabel: "View All Plastic Surgery",
    groups: [
      { title: "Cutting and Dissection", items: ["Curettes", "Dissectors", "Electrodes & Coagulators", "Knife Handles", "Knives", "Scissors"] },
      { title: "Gripping and Suturing", items: ["Clamps", "Forceps", "Needle Holders"] },
      { title: "Bone and Cartilage", items: ["Chisels", "Gouges", "Mallets", "Osteotomes", "Rasps", "Rongeurs"] },
      { title: "Retracting and Measuring", items: ["Calipers", "Elevators", "Hooks", "Markers", "Probes", "Retractors"] },
    ],
  },
  {
    name: "ENT",
    slug: "ent",
    description: "ENT tools for tonsillectomy, sinus surgery, and laryngoscopy",
    viewAllLabel: "View All ENT Instruments",
    groups: [
      { title: "Sinus and Nasal", items: ["Chisels", "Curettes", "Elevators", "Forceps", "Hooks", "Knives", "Seekers", "Septum Needles", "Suction Tubes"] },
      { title: "Ear", items: ["Calipers", "Curettes", "Dissectors", "Ear Loops", "Elevators", "Forceps", "Hooks", "Retractors", "Suction Irrigators"] },
      { title: "Throat and Laryngeal", items: ["Adenotomes", "Curettes", "Depressors", "Elevators", "Forceps", "Gags", "Mirrors", "Retractors"] },
      { title: "Disposables", items: ["Blades", "Electrodes", "Knives"] },
    ],
  },
  {
    name: "Hand Surgery",
    slug: "hand-surgery",
    description: "Hand surgery tools for tendon repairs, fracture fixation, and arthroplasty",
    viewAllLabel: "View All Hand Surgery Instruments",
    groups: [
      { title: "Cutting and Dissection", items: ["Dissectors", "Knife Handles", "Knives", "Scissors", "Strippers", "Suction Tubes"] },
      { title: "Gripping and Suturing", items: ["Clamps", "Forceps", "Needle Holders", "Wire Twisters"] },
      { title: "Bone and Fixation", items: ["Gouges", "Hand Fixation", "Mallets", "Osteotomes", "Rasps", "Rongeurs"] },
      { title: "Retracting and Measuring", items: ["Calipers", "Goniometers", "Hooks", "Retractors", "Rulers", "Spreaders"] },
    ],
  },
  {
    name: "Orthopedic",
    slug: "orthopedic",
    description: "Orthopedic tools for joint replacement, fracture management, and arthroscopy",
    viewAllLabel: "View All Orthopedic Surgery Instruments",
    groups: [
      { title: "Bone Cutting", items: ["Chisels", "Curettes", "Gouges", "Osteotomes", "Mallets", "Rasps"] },
      { title: "Fixation and Hardware", items: ["Bending Tools", "Drill Bits", "K-Wires", "Screwdrivers", "Steinmann Pins"] },
      { title: "Grasping and Cutting", items: ["Clamps", "Cutters", "Forceps", "Needle Holders", "Pliers", "Scissors"] },
      { title: "Exposure and Access", items: ["Elevators", "Hooks", "Retractors", "Suction Tubes"] },
    ],
  },
  {
    name: "OB/GYN",
    slug: "ob-gyn",
    description: "OB/GYN tools for deliveries, hysterectomies, and laparoscopy",
    viewAllLabel: "View All OB/GYN Surgery Instruments",
    groups: [
      { title: "Examination and Access", items: ["Hooks", "Probes", "Retractors", "Speculums"] },
      { title: "Uterine and Cervical", items: ["Curettes", "Dilators", "Manipulators", "Stents"] },
      { title: "Grasping and Cutting", items: ["Clamps", "Forceps", "Scissors"] },
    ],
  },
  {
    name: "Cardiovascular",
    slug: "cardiovascular",
    description: "Cardiovascular tools for bypass grafts, stent placements, and valve repairs",
    viewAllLabel: "View All Cardiovascular Surgery Instruments",
    groups: [
      { title: "Cutting and Dissection", items: ["Cutters", "Dissectors", "Raspatories", "Rongeurs", "Scissors", "Shears"] },
      { title: "Clamping and Grasping", items: ["Clamps", "Forceps", "Needle Holders", "Wire Twisters"] },
      { title: "Exposure and Access", items: ["Elevators", "Hooks", "Retractors", "Spreaders"] },
      { title: "Vessel and Specialty", items: ["Cannulas", "Dilators", "Ligature Carriers", "Loops", "Needles", "Trocars"] },
    ],
  },
  {
    name: "Neuro/Spinal",
    slug: "neuro-spinal",
    description: "Neuro/spinal tools for craniotomies, spinal fusion, and shunt placements",
    viewAllLabel: "View All Neuro/Spinal Surgery Instruments",
    groups: [
      { title: "Cutting and Bone Work", items: ["Curettes", "Gouges", "Impactors", "Mallets", "Osteotomes", "Scissors"] },
      { title: "Grasping and Suturing", items: ["Clamps", "Forceps", "Needle Holders"] },
      { title: "Exposure and Access", items: ["Dissectors", "Distractors", "Elevators", "Hooks", "Retractors", "Spreaders"] },
      { title: "Suction and Specialized", items: ["Cannulas", "Probes", "Separators", "Spatulas", "Speculum", "Suction Tubes"] },
    ],
  },
  {
    name: "General Surgery",
    slug: "general-surgery",
    description: "General Surgery tools for appendectomies, hernia repairs, and gastrointestinal surgeries",
    viewAllLabel: "View All General Surgery Instruments",
    groups: [
      { title: "Cutting and Dissection", items: ["Blades", "Cutters", "Dissectors", "Knife Handles", "Scissors"] },
      { title: "Grasping and Suturing", items: ["Clamps", "Forceps", "Needle Holders", "Pliers", "Wire Cutters"] },
      { title: "Bone and Tissue", items: ["Chisels", "Curettes", "Gouges", "Mallets", "Osteotomes", "Rasps", "Rongeurs"] },
      { title: "Exposure and Access", items: ["Elevators", "Hooks", "Light Cords", "Probes", "Retractors", "Spatulas", "Suction Tubes"] },
    ],
  },
];

/**
 * Second-level categories under Ophthalmology (Landing Page card). items: the category's sub-categories in the
 * live amblersurgical.com menu, for the "Select a Category" dropdowns (Instruments lists its instrument types instead).
 */
const ophthalmologyCategories = [
  { name: "Instruments", slug: "instruments", image: images["1907881e"] },
  {
    name: "Specialty",
    slug: "specialty",
    image: images["a76c7e54"],
    items: [
      "Aaron Burr II", "Algerbrush II", "Bipolar Cords", "Bipolar Pencils", "Demagnetizers", "Electrodes", "Eye Compresses",
      "Eye Models", "Eye Shields", "Honan Balloon", "I-A Handpieces", "Intraocular Magnets", "Iris Retractors", "Lenses",
      "Occluders", "Orbital Sizers", "Phaco Handpieces", "Phaco Flushers", "Phaco Tip Wrenches", "Reinverters",
      "Symblepharon Rings", "Trocar Systems",
    ],
  },
  {
    name: "Diamond Knives",
    slug: "diamond-knives",
    image: images["c565e376"],
    items: ["Clear-Cornea", "Crescent", "Keratome", "LRI", "Trapezoid", "Paracentesis", "Step/Micrometer"],
  },
  {
    name: "Disposables",
    slug: "disposables",
    image: images["050f5724"],
    items: [
      "Bipolar Cords", "Bipolar Pencils", "Calipers", "Cannulas", "Capsular Tension Rings", "Cautery Tips", "Choppers",
      "Conformers", "Curettes", "Depressors", "Dilators", "Eye Bubbles", "Eye Spheres", "Fluid Filters", "Forceps",
      "Glide Sheets", "Handpieces", "Headbands", "Hooks", "I-A Handpieces", "Iris Retractors", "Knives", "Knob Covers",
      "Laser Probes", "Manipulators", "Markers", "Marking Pads", "Membrane Scrapers", "Needle Holders", "Orbital Sizers",
      "Probes", "Punctum Plugs", "Pupil Expanders", "Rotators", "Scissors", "Spatulas", "Speculum", "Sponges", "Spuds",
      "Trephine Blades", "Trephine Punches", "Wipes",
    ],
  },
];

const specialties = specialtyList.map((s) => ({
  ...s,
  url: `/browse-by-specialty/${s.slug}/`,
  types: [...new Set(s.groups.flatMap((g) => g.items))].map((name) => ({ name, slug: slugify(name) })),
}));

/** Every instrument type across the specialties' menu groups, A to Z. */
const instrumentTypes = Array.from(
  new Map(specialties.flatMap((s) => s.types).map((t) => [t.slug, t])).values(),
).sort((a, b) => a.name.localeCompare(b.name));

// ---------------------------------------------------------------------------
// Product lines (brands). Logos exported from the Figma Landing Page.

const logo = (slug) => `/img/brands/${slug}.png`;
const productLines = [
  ["Ambler Surgical", true], ["Duckworth & Kent", true], ["Ocular Instruments", true], ["Surgistar", true],
  ["Volk Optical", true], ["Aspen Surgical", true], ["Ellman International", true], ["Epsilon", true],
  ["Mastel Precision", true], ["Geuder", true], ["Rumex", true], ["Oculo-Plastik", true],
  ["Bovie Medical"], ["Branson Ultrasonic"], ["Eye Shield Technology"], ["Fiegert Endotech"], ["gSource"],
  ["Gulden Ophthalmics"], ["Hurricane Medical"], ["Lacrivera"], ["Medin Trays"], ["Micro Scientific"],
  ["Odyssey Medical"], ["Padgett-Miltex"], ["Peregrine Surgical"], ["Polarware Trays"], ["PST Trays"],
  ["SteriMedix"], ["SteriPack Trays"], ["The Alger Company"], ["The Lebanon Corp"],
].map(([name, hasLogo]) => {
  const slug = slugify(name);
  return { name, slug, url: `/product-lines/${slug}/`, logo: hasLogo ? logo(slug) : null };
});

// Sterilization and repair lists come from the live amblersurgical.com menu.
const sterilization = [
  "Basins", "Bowls", "Buckets", "Cautery Tip Cleaners", "Cleaning Brushes", "Cups", "Diamond Knives",
  "Disinfectant Solutions", "Graduated Measures", "I.D. Roll Tape", "Instrument Guards", "Instrument Stringers",
  "Jars", "Trays", "Ultrasonic Cleaners",
].map((name) => ({ name, slug: slugify(name) }));

// href: the service's own page; the others link to their card on /repair-services/#<slug>.
const repairPages = {
  "cryosurgical-handpiece": "/repair-services/cryosurgical-handpiece-repair/",
  "micro-instrument": "/repair-services/micro-instrument-repair/",
};
const repairServices = [
  "Cryosurgical Handpiece", "Diamond Knife", "General Instrument", "Micro Instrument", "Phaco Handpiece", "Surgical/Diagnostic Lenses",
].map((name) => {
  const slug = slugify(name);
  return { name, slug, href: repairPages[slug] || `/repair-services/#${slug}` };
});

// ---------------------------------------------------------------------------
// Products: [itemNumber, name, description, price, imageHash8, typeSlug, productLineSlug?, extra?]

const rows = [
  // Ambler Surgical, from PLP "Product Type Page" and the product card in the styleguide.
  ["1044E", "Bishop-Harmon irrigating cannula set", "Includes 19 gauge cannula, adapter and silicone bulb (1045E, 1046E, 1047E)", 84, "c19e9704", "cannulas"],
  ["2100E", "Braunstein fixed caliper", "2 3/4'', aphakic: 3.5mm, phakic: 4.0mm", 69, "55dde4bd", "calipers"],
  ["2252E", "Castroviejo suturing forceps", "4 3/8'', straight shafts, 0.12mm 1x2 teeth, 5.5mm tying platforms, wide serrated flat handle", 284, "583abbc0", "forceps"],
  ["7974E", "Lieberman lid speculum", "3'', adult size, 15.0mm open K-wire blades, nasal approach, adjustable thumb-screw tension", 284, "ae00e760", "speculum"],
  ["93-272", "Microsurgical plastic instrument sterilization tray", "6'' W x 10'' L x 1 1/2'' H, deep base, lid, and silicone finger mat, accommodates 12-15 instruments", 95, "9f2fcfc0", "trays"],
  ["G-37400", "Braunstein fixed caliper", "1 3/4'', 3.5mm posterior", 121, "4029d43e", "calipers"],
  ["5616E", "Westcott tenotomy scissors", "4 1/2'', curved right 19.0mm blades, blunt tips, flat handle", 309, "77eae7ac", "scissors"],
  // Duckworth & Kent, from PLP "Brand Page - Duckworth & Kent".
  ["9-692", "D&K Braunstein fixed caliper", "3 3/4'', double-ended, measures 3.5mm and 4.0mm, round handle, titanium", 314, "0d9fa3de", "calipers", "duckworth-and-kent"],
  ["2-100E", "D&K Pierse fixation forceps", '3 1/2", straight shafts, 0.25 notched tips, 6.0mm tying platforms, flat handle', 352, "d1f02355", "forceps", "duckworth-and-kent"],
  ["2-716G-8RE", "D&K Calladine-Inamura capsulorhexis forceps", 'For scleral tunnel incision, 4 1/2", vaulted shafts, angled tips', 607, "94431948", "forceps", "duckworth-and-kent"],
  ["2-716G-9RE", "D&K Calladine-Inamura capsulorhexis forceps", 'For corneal incision, 4 3/4", vaulted shafts, tips angled 45º', 607, "2c1b3551", "forceps", "duckworth-and-kent"],
  ["3-205", "D&K micro needle holder", '4 1/4", delicate, curved, 7.0mm smooth jaws, round handle, without lock, titanium', 458, "829c90fd", "needle-holders", "duckworth-and-kent"],
  ["6-085-6", "D&K Barrett nucleus divider & chopper", '4 3/4", double-ended, angled 45º shafts, 14.0mm from bend to tips', 470, "e1b2ee1e", "choppers", "duckworth-and-kent"],
  ["6-250", "D&K Sinskey hook", '4 3/4", angled shaft, 10.0mm from bend to tip, 0.18mm tip, round handle, titanium', 189, "cbbed58c", "hooks", "duckworth-and-kent"],
  ["8-602", "D&K Mackool hydrodissection cannula", "23 gauge, 30º angled, 8.0mm from bend to tip", 286, "3b70fc23", "cannulas", "duckworth-and-kent"],
  ["8-652", "D&K irrigation handpiece", '4 1/4", 23 gauge, 0.4mm irrigation ports, curved', 319, "74c4bce9", "handpieces", "duckworth-and-kent"],
  ["8-730", "D&K screw-in I/A tip", "22 gauge, 90º angled tip, 0.25mm aspiration port, titanium", 234, "47ab7959", "handpieces", "duckworth-and-kent"],
  ["8-731", "D&K screw-in I/A tip", "22 gauge, 90º angled tip, 0.3mm aspiration port, titanium", 234, "7711e2f5", "handpieces", "duckworth-and-kent"],
  ["8-731-1", "D&K screw-in I/A tip", "22 gauge, angled 45º tip, 0.3mm aspiration port, titanium", 234, "aa309b56", "handpieces", "duckworth-and-kent"],
  ["8-731-3", "D&K screw-in I/A tip", "22 gauge, straight tip, 0.3mm aspiration port, titanium", 234, "64181590", "handpieces", "duckworth-and-kent"],
  ["9-510", "D&K Fine-Thornton swivel fixation ring", '4 3/8", C-shaped 13.0mm ring', 381, "630c4e4c", "fixation-rings", "duckworth-and-kent"],
  ["9-598-2", "D&K Koch-Cionni lid speculum", "Adult size, 13.5mm open wire blades, temporal", 451, "209da060", "speculum", "duckworth-and-kent"],
  ["9-599", "D&K Shepard reversible lid speculum", "Adult size, 14.0mm solid blades, nasal", 499, "93209bbc", "speculum", "duckworth-and-kent"],
  ["9-840", "D&K Cionni Toric reference marker", '4 7/8", 70º angled shaft, 3 blades', 624, "473743f3", "markers", "duckworth-and-kent"],
  ["9-841", "D&K Cionni Toric axis marker", '4 1/2", 45º curved shaft, 2 rotating blades', 841, "7bf386ed", "markers", "duckworth-and-kent"],
  ["1-110", "D&K Vannas scissors", '3 3/4", straight blades, sharp tips, flat handle, titanium', 458, "930848f8", "scissors", "duckworth-and-kent"],
  ["1-111", "D&K Vannas scissors", '3 3/4", curved blades, sharp tips, flat handle, titanium', 458, "698c2272", "scissors", "duckworth-and-kent"],
  ["1-111B", "D&K Vannas scissors", '3 3/4", curved blades, blunt tips, flat handle, titanium', 458, "7dfa7272", "scissors", "duckworth-and-kent"],
  // Cart and mini cart lines.
  ["14205", "Orange polycarbonate eye shields", "Universal, non-sterile, packaged 100 per box", 218, "3971ee67", "eye-shields", "ambler-surgical", { badge: null }],
  ["BCD-10", "Bipolar cord, 12'", "Straight connector, packaged individually sterile, disposable, box of 10", 120, "41a72661", "bipolar-cords", "ambler-surgical", { badge: null }],
  ["2084E", "Camellin style LASIK alcohol well", "Size Variant: 6.5mm", 324, "d08f4688", "alcohol-wells", "ambler-surgical", { badge: null, variant: "Size Variant: 6.5mm" }],
  // Search dropdown examples (no item numbers in the design).
  [undefined, "Castroviejo Needle Holder", "Curved jaws with lock", 145, "cc6f6b46", "needle-holders", "ambler-surgical", { badge: null }],
  [undefined, "Westcott Tenotomy Scissors", "Curved blades, blunt tips", 89.5, "7623cce9", "scissors", "ambler-surgical", { badge: null, oldPrice: 105 }],
  [undefined, "Derf Needle Holder", "Smooth jaws with lock", 112, "aadc3c4a", "needle-holders", "ambler-surgical", { badge: null }],
];

const products = rows.map(([sku, name, description, price, image, type, brand = "ambler-surgical", extra = {}]) => {
  const slug = slugify(sku ? `${name} ${sku}` : name);
  return {
    slug,
    url: `/product/${slug}/`,
    sku: sku ?? null,
    name,
    description,
    price,
    oldPrice: null,
    image: images[image],
    imageKey: image,
    brand,
    brandName: productLines.find((b) => b.slug === brand)?.name ?? brand,
    specialties: ["ophthalmology"],
    type,
    typeName: instrumentTypes.find((t) => t.slug === type)?.name ?? type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    badge: "Popular",
    variant: null,
    ...extra,
  };
});

/** The 28 products drawn as ITEM# cards on the Figma listing pages. */
const listingProducts = products.filter((p) => p.badge === "Popular");

export default {
  specialties,
  ophthalmologyCategories,
  instrumentTypes,
  productLines,
  sterilization,
  repairServices,
  products,
  listingProducts,
  slugify,
};
