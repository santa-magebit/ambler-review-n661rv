// Global data `contentPages` ("content" is reserved by Eleventy).
// Content for the "content" pages (Home, About, Repair Services, Sterilization,
// Contact). Copy comes from the Figma frames: Landing Page (34141:37897),
// CMS - About Ambler Surgical (34974:1141) and Repair Services (34799:68554).
// Texts the layer dump cuts off were read from the frame renders.
import catalog from "./catalog.js";
import plp from "./plp.js";
import images from "./images.js";

/**
 * Gradients measured from the Figma renders (the dumps only say GRADIENT_LINEAR).
 * heroFade: navy over the Landing Page and Repair Services hero photos.
 * heroFadePhone: the same on phones (mobile 34141:38087, 34897:7756), solid navy to 30%, then fading out across the photo.
 * aboutFade: About hero, solid navy to 14%, clear at 64%.
 * whyFade: About "Why Us" band, clear at 12%, solid navy from 50%.
 * titleLine: 2px line under hero titles, orange with a white highlight and clear ends.
 */
const gradients = {
  heroFade: "linear-gradient(90deg, #004776 0%, rgba(0, 71, 118, 0) 59%)",
  heroFadePhone: "linear-gradient(90deg, #004776 30%, rgba(0, 71, 118, 0) 100%)",
  aboutFade: "linear-gradient(90deg, #004776 14%, rgba(0, 71, 118, 0) 64%)",
  whyFade: "linear-gradient(90deg, rgba(0, 71, 118, 0) 12%, #004776 50%)",
  titleLine:
    "linear-gradient(90deg, rgba(245, 130, 32, 0) 0%, #f58220 16%, #f58220 30%, #ffffff 50%, #f58220 70%, #f58220 84%, rgba(245, 130, 32, 0) 100%)",
};

/** "why us?" band (Landing Page 34141:38022, Repair Services 34799:68578). */
const trust = [
  { icon: "award", title: "Specialists Since 1997", text: "Providing high-quality surgical instruments for over 25 years." },
  { icon: "truck-delivery", title: "Fast, Reliable Shipping", text: "Orders ship quickly and arrive on time." },
  { icon: "headphones", title: "Dedicated Customer Support", text: "Real people. Quick answers. Expert guidance." },
  { icon: "shield-check", title: "Free Lifetime Repair", text: "Included with most Ambler ophthalmic instruments." },
];

// ---------------------------------------------------------------------------
// Home

/** Logo sizes in the "Featured Brands" boxes (34141:38042); the files are 2x exports. */
const logoSize = {
  "ambler-surgical": [165, 42],
  "duckworth-and-kent": [67, 48],
  "ocular-instruments": [151, 48],
  surgistar: [134, 38],
  "volk-optical": [141, 44],
  "aspen-surgical": [174, 22],
  "ellman-international": [117, 44],
  epsilon: [135, 36],
  "mastel-precision": [147, 40],
  geuder: [141, 42],
  rumex: [162, 38],
  "oculo-plastik": [175, 44],
};

const home = {
  /** Figma crops of the Ophthalmology category photos (34141:37913): Disposables is drawn flipped. */
  categoryImage: { instruments: "object-top", disposables: "-scale-y-100" },
  /** Repair band cards (34141:38033). Diamond Knives and Surgical Lenses open their repair service; imgClass = Figma crop. */
  repairCards: [
    { title: "Instruments", image: images["1907881e"], href: "/repair-services/", figma: "34141:38034", imgClass: "object-top" },
    { title: "Specialty", image: images["a76c7e54"], href: "/repair-services/", figma: "34141:38035", imgClass: "!object-contain px-5" },
    { title: "Diamond Knives", image: images["c565e376"], href: "/repair-services/#diamond-knife", figma: "34141:38036" },
    {
      title: "Surgical Lenses",
      image: images["3e4a0b96"],
      href: "/repair-services/#surgical-diagnostic-lenses",
      figma: "34141:38037",
      imgClass: "[transform:scale(1.25,-1.25)]",
    },
  ],
  logos: catalog.productLines
    .filter((l) => l.logo)
    .slice(0, 12)
    .map((l) => ({ ...l, width: (logoSize[l.slug] || [160, 40])[0], height: (logoSize[l.slug] || [160, 40])[1] })),
};

// ---------------------------------------------------------------------------
// About Ambler Surgical

const about = {
  /** Sticky sub-navigation anchors (34974:1155), in page order. */
  sections: [
    { id: "about-us", label: "About Us" },
    { id: "why-us", label: "Why Us" },
    { id: "executive-board", label: "Executive Board" },
    { id: "societies-affiliations", label: "Societies & Affiliations" },
    { id: "customer-testimonials", label: "Customer Testimonials" },
  ],
  intro:
    "Founded in 1997, Ambler Surgical set out to give surgical facilities a reliable, efficient source for specialty instruments — without compromising on quality. Nearly three decades later, that's still the job: integrity, quality, value, expertise, and service, backed by the most advanced online catalog in the industry.",
  whoWeAre:
    "Our catalog is shaped by the people who use it. We work directly with nurse managers and expert advisors, gather feedback from every order, and invest continuously in new e-commerce technology — so the improvements customers ask for actually show up on the site.",
  recentAdditions: [
    [
      "Cleaning & sterilization documents for every item",
      "Downloadable product flyers",
      "Simplified return policy",
      "Improved related and cross-sell suggestions",
      "Fully responsive design, on any device",
    ],
    [
      "Instant, reliable, seamless navigation",
      "Attribute-based product browsing",
      "Latest contract pricing",
      "High-resolution product images, including close-ups",
      "Expansive cross-reference database",
    ],
  ],
  whyLead: {
    title: "Uncompromising quality.",
    text: "Only German- and U.S.-made instruments, across Ophthalmology, ENT, Hand Surgery, Plastic Surgery, Neuro/Spinal, Cardiovascular, OB/GYN, Orthopedic, General Surgery, and Repair Services.",
  },
  /** Bullets; `link` renders an underlined link at the end of the text. */
  why: [
    { title: "21,000+ instruments, hand-selected.", text: "Every instrument is chosen and stood behind by our team for its craftsmanship." },
    { title: "Honest, published pricing.", text: "See real pricing upfront — no calls needed to get the \"real price.\"" },
    { title: "Expert, dedicated sales support.", text: "Our team is trained across surgical specialties, industry trends, and competitive options." },
    { title: "Risk-free evaluation.", text: "Unsatisfied with a purchase? Return it within 30 days for full credit (before sterilization)." },
    {
      title: "Lifetime repair on Ambler brand ophthalmic instruments.",
      text: "* Sharpening, finishing, and aligning — free of charge. *Most instruments qualify —",
      link: { label: "see details", href: "/repair-services/" },
      after: ".",
    },
    { title: "Service beyond the sale.", text: "Timely updates on cleaning, sterilization, and industry trends through our email program and society partnerships." },
    {
      title: "Broad contract participation.",
      text: "Contracted supplier for HealthTrust, SCA, MAGNET, USPI, Surgery Partners, AmSurg, and GSA. Not on one of these?",
      link: { label: "Ambler Alliance", proto: true },
      after: " offers similar savings.",
    },
  ],
  board: [
    {
      initials: "MA",
      name: "Marty Anthony",
      role: "President & Founder",
      email: "MAnthony@AmblerSurgical.com",
      figma: "34974:1260",
      bio: "Marty Anthony founded Ambler Surgical in 1997, after years in sales and sales management across healthcare publishing and surgical instrument companies. His vision was a customer-driven company built on integrity, expertise, and value — one that competed on quality and affordability rather than trying to be everything to everyone. That focus paid off: by concentrating on a select set of surgical specialties, Ambler Surgical built an industry-leading position and what's now the largest, most advanced online catalog of specialty instruments in the field. Marty lives in Conshohocken, PA with his two sons, and enjoys golfing, cycling, and fishing when he's away from the office.",
    },
    {
      initials: "TK",
      name: "Tony Kroboth",
      role: "Vice President of Operations",
      email: "TKroboth@AmblerSurgical.com",
      figma: "34974:1270",
      bio: "Tony Kroboth joined Ambler Surgical in 2003 as VP of Operations, following a background in retail sales and membership services. He runs the day-to-day of the business — vendor relations, group purchasing contracts, product pricing, and the online catalog and website — and has been central to the company's growth ever since. Despite the scope of his role, Tony still personally works with many long-term clients on their instrument needs. He holds a BA in Business Administration and a BS in Information Computer Science from DeSales University, and lives in Chester County, PA with his wife and three kids, where he spends his free time golfing and playing basketball.",
    },
  ],
  societiesText:
    "Our customers turn to us because in addition to supplying the highest quality instruments at affordable prices, we do our best to provide additional guidance when it comes to new products, cleaning and sterilization, and trends in our industry. Our industry affiliations and partnerships allow us to provide valuable service and information about membership opportunities, webinars, continuing education and useful documents for your ophthalmic O.R.",
  /** Logo boxes (34974:1283): an image, or the name set as text where Figma has no logo (phones: mobile 34974:121015 sizes). */
  societies: [
    { name: "American Academy of Ophthalmology", image: images["11463f33"] },
    { name: "American Society of Cataract and Refractive Surgery", image: images["e239b139"] },
    { name: "American Society of Ophthalmic Administrators", image: images["272be983"] },
    { name: "Outpatient Surgery Magazine", image: images["0f5459fa"] },
    { name: "EyeCare Market", size: "text-lg md:text-h4" },
    { name: "American Society of Ophthalmic Registered Nurses (ASORN)", size: "text-xs md:text-sm md:leading-[18px]" },
  ],
  testimonials: [
    {
      figma: "34974:1296",
      quote:
        "Ambler Surgical's Free Lifetime Repair Program has helped me save $100's of dollars every month on my routine surgical instrument repair costs. The best part is that this comes with most Ambler instruments at no cost! Repairs are completed and normally returned within 48 hours.",
      name: "Carlina Smith",
      place: "NovaMed Eye Surgery Center · Denver, CO",
    },
    {
      figma: "34974:1314",
      quote:
        "We switched our ophthalmic instruments to Ambler two years ago and haven't looked back. The quality matches the big brands, the prices are honest, and the free lifetime repair has made a real difference to our yearly budget.",
      name: "David Chen",
      place: "Lakeview Eye Institute · Columbus, OH",
    },
    {
      figma: "34974:1305",
      quote:
        "Ordering from Ambler is the easiest part of my week. Pricing is right there on the site, the cross-reference tool finds the exact match for what we already use, and orders arrive fast. Their team always follows up to make sure we have what we need.",
      name: "Jennifer Morales",
      place: "Riverside Ambulatory Surgery Center · Austin, TX",
    },
  ],
  /** "More from Ambler" cards (34974:1332). action: proto = not designed, search = focus the header search. */
  ctas: [
    {
      figma: "34974:1333",
      icon: "calendar-search",
      title: "Upcoming Meeting Schedule",
      text: "Upcoming industry conferences, trade shows and opportunities to earn educational credits",
      button: "View Schedule",
      action: "proto",
    },
    {
      figma: "34974:1339",
      image: images["c905e951"],
      title: "Ambler Alliance",
      text: "Partner with Ambler Surgical and form an Alliance!",
      button: "Learn More",
      action: "proto",
    },
    {
      figma: "34974:1345",
      icon: "device-imac-search",
      title: "Cross Reference System",
      text: "Ambler Surgical has developed a cross-reference system unmatched by anyone in our industry. You can quickly access over 110,000 catalog numbers from over 125 instrument companies!",
      button: "Search Now",
      action: "search",
    },
  ],
};

// ---------------------------------------------------------------------------
// Repair Services

/**
 * Figma card title and image per catalog repair service (34799:68570, 34799:68574), in Figma order.
 * imgClass approximates the Figma crop of each photo (scaled or turned inside the frame).
 */
const repairCards = [
  ["micro-instrument", "Micro Instruments", "d61fe469", "34799:68571", ""],
  ["diamond-knife", "Diamond Knife Rehoning Service", "c565e376", "34799:68572", ""],
  ["phaco-handpiece", "Phaco Handpiece", "d76b9f33", "34799:68573", "[transform:scale(1.12)_rotate(-8deg)]"],
  ["cryosurgical-handpiece", "Cryosurgical Handpiece", "db601ef3", "34799:68575", ""],
  ["general-instrument", "General Surgical Instrument", "31a47e5d", "34799:68576", "!object-contain rotate-[24deg]"],
  ["surgical-diagnostic-lenses", "Surgical/Diagnostic Lens", "cef4ff5f", "34799:68577", "!object-contain scale-[1.22]"],
].map(([slug, title, image, figma, imgClass]) => {
  if (!catalog.repairServices.some((s) => s.slug === slug)) throw new Error(`Unknown repair service "${slug}"`);
  return { slug, title, image: images[image], figma, imgClass };
});

const repair = {
  // Figma's line first, then the old site's promise (2-4 lines, like the other heroes).
  intro:
    "Ambler Surgical is your single-source solution for expert surgical instrument repair. We keep phaco handpieces, diamond knives, micro and general instruments and lenses at peak performance.",
  services: repairCards,
  whyChoose: [
    {
      figma: "34799:68590",
      title: "Precision Over Convenience",
      text: "Mobile vans lack the stability and heavy machinery of a dedicated lab. We provide deep-cleaning, gold-plating, and microscopic alignment that on-site services cannot match.",
    },
    {
      figma: "34799:68595",
      title: "Expert Microsurgical Techs",
      text: "We handle repairs others decline, performing complex needle holder retipping and high-magnification scissor sharpening with unmatched precision.",
    },
    {
      figma: "34799:68601",
      title: "FDA Registered Facility",
      text: "All work is performed in our regulated facility under strict quality controls, ensuring every instrument meets safety standards before returning to the OR.",
    },
    {
      figma: "34799:68606",
      title: "Free Lifetime Repair",
      text: "We were the first company to offer FREE lifetime sharpening, alignment, and adjustment for qualifying Ambler-brand ophthalmic instruments. Learn more about our",
      link: "Free Lifetime Repair Program",
    },
  ],
  everyNeed: [
    "After extended use, even the highest quality surgical instruments lose their edge or alignment. Instead of discarding valuable assets, Ambler Surgical offers a surgical instrument repair service designed to restore your equipment to original manufacturer specifications. Our capabilities cover the entire spectrum of the operating room.",
    "Our FDA-registered lab is staffed by some of the most experienced technicians in the industry. Unlike general repair shops, we assign each repair to a surgical instrument repair specialist trained in that specific device. With us, you don't need to call for an RMA number. Simply download a repair form, ship your instruments, and we handle the rest.",
  ],
  /** FAQ (34799:68632): the same questions as the PLP FAQ, answered from the old site (see plp.js). */
  faq: plp.faq.general.map((f, i) => ({ id: ["sterilize", "cataract-tray", "materials", "repair-services"][i], ...f })),
};

export default { gradients, trust, home, about, repair };
