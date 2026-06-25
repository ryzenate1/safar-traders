import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { productCategories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import logo from "@/images/safarlogo-512.webp";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Export Process", href: "/export-process" },
  { label: "Why Us", href: "/why-us" },
  { label: "Resources", href: "/resources" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-site footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <span className="footer-logo-shell"><Image src={logo} alt={siteConfig.name} height={32} /></span>
          </Link>
          <p>Global industrial sourcing and export partner for buyers who need clear requirements, documentation, and coordinated shipment handling.</p>
          <div className="footer-contact-list">
            <a href={`tel:${siteConfig.phoneRaw}`}><Phone size={14} aria-hidden="true" />{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}><Mail size={14} aria-hidden="true" />{siteConfig.email}</a>
            <span><MapPin size={14} aria-hidden="true" />{siteConfig.address.city}, {siteConfig.address.state}, {siteConfig.address.country}</span>
          </div>
        </div>

        <div>
          <p className="footer-heading">Capabilities</p>
          <ul>{productCategories.map((item) => <li key={item.slug}><Link href={`/products/${item.slug}`}>{item.shortTitle}</Link></li>)}</ul>
        </div>
        <div>
          <p className="footer-heading">Company</p>
          <ul>{companyLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className="footer-heading">RFQ</p>
          <ul>
            <li><Link href="/contact">Request a Quote</Link></li>
            <li><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp inquiry</a></li>
            <li><a href={`mailto:${siteConfig.email}`}>Trade email</a></li>
          </ul>
        </div>
      </div>
      <div className="container-site footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>International trading · Procurement support · Export coordination</p>
      </div>
    </footer>
  );
}
