export const siteConfig = {
  name: "Safar Traders",
  tagline: "Trade & Export Partner",
  description:
    "Safar Traders is a trade and export partner for buyers sourcing non-perishable industrial and commercial goods — metals, machinery, industrial materials, and custom requirements — with procurement coordination, documentation support, and supply handling.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safartraders.com",
  ogImage: "/og-image.jpg",
  lastModified: "2026-07-10",
  phone: "+91 75400 02039",
  phoneRaw: "+917540002039",
  phoneSecondary: "+91 75400 02038",
  phoneSecondaryRaw: "+917540002038",
  whatsapp: "+917540002039",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "thesafartraders@gmail.com",
  address: {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
  },
  social: {
    linkedin: "https://linkedin.com/company/safar-traders",
  },
  nav: [
    { label: "Capabilities", href: "/products" },
    { label: "Process", href: "/export-process" },
    { label: "Why Us", href: "/why-us" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
};
