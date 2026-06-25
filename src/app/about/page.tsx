import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our operations as an international trading and export company — our sourcing approach, operational capabilities, and commitment to transparent global trade.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  {
    label: "Specification-first",
    detail: "Every order starts with a clear requirement. We source against your specification and do not ship material that does not meet agreed criteria.",
  },
  {
    label: "Document-complete",
    detail: "A shipment is not closed until every document is in order — BL, invoice, packing list, COO, and any required inspection certificates.",
  },
  {
    label: "Buyer-responsive",
    detail: "We maintain a single point of contact per order. Questions get answered. Loading photos get sent. Updates happen before you need to ask.",
  },
  {
    label: "Compliance-aware",
    detail: "We operate within applicable export regulations and destination-country import rules as standard practice — no shortcuts, no surprises.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An international trading and export company built for serious buyers."
        description="We source, procure, and export industrial products to buyers worldwide — metals, machinery, equipment, and industrial materials — with full export documentation and logistics coordination."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section style={{
        backgroundColor: "var(--color-bg)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--color-border-light)",
      }}>
        <div className="container-site">
          <div className="about-2col">
            <div>
              <span className="eyebrow" style={{ marginBottom: "0.75rem", display: "block" }}>What we do</span>
              <h2 style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
                lineHeight: 1.2,
              }}>
                From sourcing to shipment — end to end.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                We are an international trading and export company. Our operations span material sourcing,
                procurement, quality verification, and containerized export to buyers across Asia, Europe, the
                Middle East, and beyond.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
                Our sourcing capabilities cover industrial metals, machinery and equipment, plastics, paper
                and cardboard, and general industrial materials. Each order is managed by a dedicated team
                from first inquiry through final shipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{
        backgroundColor: "var(--color-bg-secondary)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--color-border-light)",
      }}>
        <div className="container-site">
          <span className="eyebrow" style={{ marginBottom: "2rem", display: "block" }}>How we operate</span>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.label} style={{
                padding: "1.5rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-md)",
              }}>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.625rem" }}>
                  {v.label}
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: "var(--color-dark-bg)",
        paddingTop: "4rem",
        paddingBottom: "4.5rem",
        textAlign: "center",
      }}>
        <div className="container-site" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            color: "var(--color-dark-text)",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}>
            Interested in working together?
          </h2>
          <p style={{ color: "var(--color-dark-muted)", marginBottom: "2rem", fontSize: "1rem", lineHeight: 1.7 }}>
            Send us your sourcing requirement and we will review it with the right product and export context.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Request a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        .about-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .about-2col { grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 600px) {
          .about-values-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
