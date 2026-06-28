import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExportProcess from "@/components/ExportProcess";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Export Process",
  description:
    "From RFQ to delivery — a transparent, documented export process for international buyers of industrial products.",
  alternates: { canonical: `${siteConfig.url}/export-process` },
};

const faqs = [
  {
    q: "What are your minimum order quantities?",
    a: "Minimum quantities vary by product. As a general guide, we work with full container loads (FCL) of 20 MT and above. Contact us with your requirement and we will confirm.",
  },
  {
    q: "Which Incoterms do you offer?",
    a: "We typically offer FOB (Free On Board) from Indian ports. CIF and CFR can be arranged for established relationships. Please specify your preferred Incoterms in your RFQ.",
  },
  {
    q: "What ports do you ship from?",
    a: "We ship from major Indian ports. The specific loading port depends on product availability and routing. Your freight forwarder can advise on optimal routing.",
  },
  {
    q: "Can we arrange third-party inspection?",
    a: "Yes. We welcome pre-shipment inspection by SGS, Bureau Veritas, or your nominated inspector. Inspection costs are typically borne by the buyer. Please mention this in your order.",
  },
  {
    q: "What payment terms do you accept?",
    a: "We typically work on Letter of Credit (LC) at sight or Telegraphic Transfer (TT) with an advance payment. Payment terms are confirmed during order negotiation.",
  },
];

export default function ExportProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Trade Process"
        title="Transparent from first requirement to final delivery."
        description="Every order follows the same documented process — so you always know where your requirement stands."
        breadcrumbs={[{ label: "Export Process" }]}
      />
      <ExportProcess />

      {/* FAQ */}
      <section style={{
        backgroundColor: "var(--color-bg-secondary)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderTop: "1px solid var(--color-border-light)",
      }}>
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <span className="eyebrow" style={{ marginBottom: "2rem", display: "block" }}>Common questions</span>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--color-border-light)",
            }}>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "0.625rem" }}>
                {q}
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
