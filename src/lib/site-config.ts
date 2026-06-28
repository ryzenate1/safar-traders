export const siteConfig = {
  name: "Safar Exports",
  tagline: "Trade & Export Partner",
  description:
    "Safar Exports is a trade and export partner for buyers sourcing non-perishable industrial and commercial goods — metals, machinery, industrial materials, and custom requirements — with procurement coordination, documentation support, and supply handling.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safarexports.com",
  phone: "+91 73959 25908",
  phoneRaw: "+917395925908",
  whatsapp: "+917395925908",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "trade@safarexports.com",
  address: {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
  },
  social: {
    linkedin: "https://linkedin.com/company/safar-exports",
  },
  nav: [
    { label: "Capabilities", href: "/products" },
    { label: "Process", href: "/export-process" },
    { label: "Why Us", href: "/why-us" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
};
