"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { FileText, Globe2, Mail, MessageCircle, SearchCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import RFQWizardLauncher from "@/components/RFQWizardLauncher";
import CompanyProfileTeaser from "@/components/CompanyProfileTeaser";

const proofItems = [
  { icon: SearchCheck, title: "Requirement-led sourcing", text: "Every order starts with a confirmed requirement — specification, quantity, destination, and trade terms." },
  { icon: FileText, title: "Documentation support", text: "Bill of Lading, Certificate of Origin, Packing List, and all clearance documents coordinated end to end." },
  { icon: Globe2, title: "Local and export supply", text: "We handle requirements for domestic buyers as well as international importers and procurement teams." },
];

export default function Hero() {
  return (
    <section className="hero-section" style={{ "--hero-bg": "url('/hero-bg.jpg')" } as CSSProperties}>
      <CompanyProfileTeaser />
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
              <div className="btn-split">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Safar Traders, I would like to discuss a sourcing/export requirement.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-split-half btn-split-whatsapp"
                >
                  <MessageCircle size={17} aria-hidden="true" /> WhatsApp
                </a>
                <span className="btn-split-divider" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Quotation Request - Safar Traders")}&body=${encodeURIComponent(
                    "Hello Safar Traders,\n\nI would like to request a quotation for the following requirement:\n\nProduct/Material: \nQuantity: \nDestination/Delivery Location: \nTrade Terms (FOB/CIF/etc.): \nAdditional Notes: \n\nCompany Name: \nContact Person: \nPhone: \n\nThank you."
                  )}`}
                  className="btn-split-half btn-split-email"
                >
                  <Mail size={17} aria-hidden="true" /> Email
                </a>
              </div>
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
