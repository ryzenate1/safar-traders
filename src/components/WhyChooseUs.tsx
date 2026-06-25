"use client";

import { ShieldCheck, FileText, Package, Headphones, Scale, Globe } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "International Sourcing Network",
    description:
      "Established supplier relationships across multiple industries let us source against almost any industrial specification — not just a fixed product catalog.",
  },
  {
    icon: FileText,
    title: "Export Documentation Expertise",
    description:
      "We issue complete export documentation: bill of lading, commercial invoice, packing list, certificate of origin, and inspection reports where required.",
  },
  {
    icon: Package,
    title: "Flexible Logistics Coordination",
    description:
      "FCL, LCL, crated, palletized, or break-bulk — we coordinate packing and freight booking to match your equipment, port, and import requirements.",
  },
  {
    icon: Headphones,
    title: "Procurement Support",
    description:
      "A single point of contact manages your order from inquiry to delivery — confirming sourcing, pricing, and timelines before anything is committed.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Verification",
    description:
      "Material and equipment are inspected against agreed specification before shipment. Non-conforming orders are caught at source, not at destination.",
  },
  {
    icon: Scale,
    title: "Compliance-First Approach",
    description:
      "We operate within applicable export regulations for every shipment — HS classification, customs documentation, and destination-country requirements.",
  },
];

type WhyChooseUsProps = {
  showHeader?: boolean;
};

export default function WhyChooseUs({ showHeader = true }: WhyChooseUsProps) {
  return (
    <section style={{
      backgroundColor: "var(--color-bg)",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      borderTop: "1px solid var(--color-border-light)",
      borderBottom: "1px solid var(--color-border-light)",
    }}>
      <div className="container-site">
        {showHeader && (
          <div style={{ marginBottom: "3.5rem", maxWidth: "640px" }}>
            <span className="eyebrow" style={{ marginBottom: "0.75rem", display: "block" }}>Why choose us</span>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
            }}>
              Built for international buyers who need it done right.
            </h2>
          </div>
        )}

        <div className="why-grid">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="why-item">
              <Icon size={22} style={{ color: "var(--color-accent)", marginBottom: "1.25rem" }} strokeWidth={1.5} />
              <h3 style={{
                fontSize: "1.0625rem", fontWeight: 600,
                color: "var(--color-text-primary)", marginBottom: "0.625rem",
                letterSpacing: "-0.01em", lineHeight: 1.3,
              }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .why-item {
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-light);
        }
        @media (min-width: 600px) {
          .why-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem 3rem; }
        }
        @media (min-width: 1024px) {
          .why-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
