// Store chrome content, from the Figma header and footer.
export default {
  name: "Ambler Surgical",
  /** Prototype test account (mock data, not a real login): the customer drawn in the Figma account and checkout frames. */
  testAccount: { name: "Raymond Myers", email: "raymond.myers@gmail.com", password: "Ambler2026!" },
  contact: {
    phone: "1-888-407-0006",
    phoneHref: "tel:18884070006",
    email: "sales@amblersurgical.com",
    address: "436 Creamery Way, Suite 300 | Exton, PA 19341",
  },
  mainNav: [
    { label: "Browse by Specialty", href: "/browse-by-specialty/", menu: "specialties" },
    { label: "Browse by Type", href: "/browse-by-type/" },
    { label: "Product Lines", href: "/product-lines/", menu: "productLines" },
    { label: "Sterilization Products", href: "/sterilization-cleaning/", menu: "sterilization" },
    { label: "Repair Services", href: "/repair-services/", menu: "repair" },
  ],
  footerQuickLinks: [
    { label: "About Ambler Surgical", href: "/about-ambler-surgical/" },
    { label: "Customer Support", href: "/contact/" },
    { label: "My Account", href: "/customer/account/" },
  ],
  social: [
    { label: "Facebook", icon: "brand-facebook", href: "https://www.facebook.com/AmblerSurgical" },
    { label: "Instagram", icon: "brand-instagram", href: "https://www.instagram.com/amblerllc" },
    { label: "LinkedIn", icon: "brand-linkedin", href: "https://www.linkedin.com/company/1443184" },
    { label: "X", icon: "brand-x", href: "https://twitter.com/amblersurgical" },
  ],
  // My Account navigation, in the order of the Figma "Logged In - Dropdown" and dashboard sidebar.
  accountNav: [
    { label: "Dashboard", href: "/customer/account/", icon: "layout-dashboard" },
    { label: "Address Book", href: "/customer/address/", icon: "home" },
    { label: "Account Information", href: "/customer/account/edit/", icon: "user" },
    { label: "Privacy Settings", href: "/privacy-settings/", icon: "lock" },
    { label: "My Orders", href: "/sales/order/history/", icon: "box" },
    { label: "Gift Card", href: "/giftcard/customer/", icon: "gift-card" },
    { label: "Stored Payment Methods", href: "/vault/cards/listaction/", icon: "credit-card" },
  ],
  // Search dropdown content (Figma "Search - Suggestions" / "Search - Results").
  search: {
    popularTerms: ["Forceps", "Scissors", "Retractors", "Needle Holders", "Rongeurs", "Clamps"],
  },
};
