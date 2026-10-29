// Global data `sterilization`: the Sterilization Products page (/sterilization-cleaning/), Figma "Sterilation Products"
// (35098:39421), the client's 1600px frame on the WIP page. The frame is the redesign's PLP Category page
// (34719:11290) in other dress, so the page uses its components; the content comes from the frame and, where the frame
// has placeholders, from amblersurgical.com/sterilization-cleaning (2026-10-28).
import catalog from "./catalog.js";
import images from "./images.js";

const bySku = (sku) => catalog.products.find((p) => p.sku === sku);

export default {
  /**
   * Hero (35098:39468): the frame's title, text and tray photo, on the right with the wider navy like the brand and
   * type heroes, so the white text keeps its contrast over the photo's pale left side.
   */
  hero: {
    title: "Sterilization Products",
    text: "Your smarter source for sterilization trays, bowls, basins, ultrasonic cleaners and more. Find quality products at competitive prices with easy online ordering, real-time availability and fast shipping.",
    image: "568ab6e3",
    placement: "right",
    wide: true,
  },
  /** "Select a Category" (35098:39478): the Quick Select over all fifteen categories of the live menu. */
  quickSelect: catalog.sterilization.map((c) => ({ label: c.name, href: c.href })),
  /**
   * Popular Categories (35098:39484): the frame's four cards. Its Trays card is drawn hovered (with the forceps text
   * of an Ophthalmology card) and its Cleaning Brushes card shows a forceps, so Trays gets the 93-200 tray and
   * Cleaning Brushes the 243001BBG brush from the live site; Instrument Guards and Ultrasonic Cleaners keep the
   * frame's photos.
   * Hover: the description in place of the photo, as the drawn Trays card, two lines like the PLP category cards:
   * what the category is for, then what it includes. From the live category pages
   * (amblersurgical.com/sterilization-cleaning/sterilization-cleaning-<slug>, 2026-10-29): their text, or the meta
   * description where a page has none (Instrument Guards, Ultrasonic Cleaners), and their product names.
   */
  cards: [
    ["trays", "446ebfcc", [
      "Durable sterilization and cleaning trays engineered for repeated autoclave use, instrument protection and contamination control.",
      "Includes micro-surgical trays, scope sterilization trays and K-wire dispensers, with silicone mat inserts.",
    ]],
    ["instrument-guards", "2c25871a", [
      "Instrument guards for sterilization and cleaning, in different designs and sizes.",
      "Sizes 1 to 9, vented and non-vented, clear or solid colors, latex-free, plus osteotome tip protectors.",
    ]],
    ["cleaning-brushes", "622363e5", [
      "Small hand brushes used to scrub soil from surgical instruments by hand before sterilization.",
      "Includes SafeClean, toothbrush-style and Fan-Tip designs, cleaning stylets, tracheostomy brushes and kits.",
    ]],
    ["ultrasonic-cleaners", "1582796d", [
      "Ultrasonic cleaners for sterilization, in different designs and sizes.",
      "Bransonic® tabletop cleaners with digital or mechanical timers, plus trays, mesh baskets and support racks.",
    ]],
  ].map(([slug, image, hover]) => {
    const c = catalog.sterilization.find((s) => s.slug === slug);
    return { name: c.name, href: c.href, image: images[image], fit: "contain", proto: true, hover };
  }),
  /**
   * Popular Products (35098:39550): the frame repeats one cannula as a placeholder; these are eight of the live page's
   * products across the popular categories.
   */
  products: ["092001BBG", "093007BBG", "243001BBG", "93-200", "93-230", "93-272", "100-410-160", "151004EEA"].map(bySku),
  /**
   * SEO band (35098:39675): the frame's titles over the PLP info band; the frame's text is lorem ipsum, so the copy is
   * the live page's description, word for word.
   */
  band: {
    figma: "35098:39675",
    image: "ac11dc60",
    title: "Surgical Sterilization Products and Solutions",
    accent: "Products to keep your instruments clean and protected",
    paragraphs: [
      "When it comes to the highest quality surgical sterilization and cleaning products, Ambler Surgical is the smarter source. From bowls and basins to the most widely used sterilization trays and even ultrasonic cleaners. Cross-reference using other company's catalog numbers or just browse our catalog by category to find exactly what you need.",
    ],
  },
};
