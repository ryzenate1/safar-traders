"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { FileText, Globe2, MessageCircle, SearchCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import RFQWizardLauncher from "@/components/RFQWizardLauncher";

const proofItems = [
  { icon: SearchCheck, title: "Requirement-led sourcing", text: "Every order starts with a confirmed requirement — specification, quantity, destination, and trade terms." },
  { icon: FileText, title: "Documentation support", text: "Bill of Lading, Certificate of Origin, Packing List, and all clearance documents coordinated end to end." },
  { icon: Globe2, title: "Local and export supply", text: "We handle requirements for domestic buyers as well as international importers and procurement teams." },
];

export default function Hero() {
  return (
    <section className="hero-section" style={{ "--hero-bg": "url('/hero-bg.jpg')" } as CSSProperties}>
      <div className="container-site">

        <div className="hero-layout">
          <div className="hero-content">

            <div className="hero-tag">
              <span className="tag tag-accent">Trade &amp; Export Partner</span>
            </div>

            <h1 className="hero-title hero-title-brand">
              <span className="hero-brand-name">Safar Traders</span>
              <span className="hero-brand-sub">Import, export, and trading support backed by R&amp;D-led sourcing.</span>
            </h1>

            <p className="hero-copy">
              We handle all kinds of import and export requirements with research and development
              review, supplier verification, and quality checks, so buyers receive the right material,
              reliable grades, and high-quality supply with confidence.
            </p>

            <div className="hero-actions">
              <RFQWizardLauncher label="Request a Quote" className="btn btn-primary btn-lg" />
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Safar Traders, I would like to discuss a sourcing/export requirement.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-soft btn-lg"
              >
                <MessageCircle size={17} aria-hidden="true" /> WhatsApp
              </a>
              <Link href="/products" className="btn btn-secondary btn-lg">
                View Capabilities
              </Link>
            </div>

          </div>
        </div>

        {/* Proof strip */}
        <div className="hero-proof-grid">
          {proofItems.map(({ icon: Icon, title, text }) => (
            <article key={title} className="quiet-card">
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
