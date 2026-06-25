"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import logo from "@/images/safarlogo-512.webp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container-site header-inner">
        <Link href="/" className="brand-link" aria-label={`${siteConfig.name} home`} onClick={() => setMenuOpen(false)}>
          <Image src={logo} alt={siteConfig.name} height={44} priority className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <div className="header-actions">
          <a href={`tel:${siteConfig.phoneRaw}`} className="phone-link">{siteConfig.phone}</a>
          <Link href="/contact" className="btn btn-primary small-btn">Request Quote</Link>
        </div>

        <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-nav-panel">
          <div className="container-site">
            <nav aria-label="Mobile navigation">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
              ))}
            </nav>
            <Link href="/contact" className="btn btn-primary mobile-quote" onClick={() => setMenuOpen(false)}>Request Quote</Link>
          </div>
        </div>
      )}
    </header>
  );
}
