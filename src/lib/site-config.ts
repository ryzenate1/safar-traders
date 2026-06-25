export const siteConfig = {
  name: "Safar Exports",
  tagline: "Global Industrial Sourcing & Export Partner",
  description:
    "Safar Exports sources, procures, and exports industrial products for international buyers — metals, machinery, packaging materials, industrial scrap, and custom sourcing requirements.",
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
