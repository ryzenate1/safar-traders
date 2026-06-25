import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadCTA from "@/components/LeadCTA";
import RFQWizardLauncher from "@/components/RFQWizardLauncher";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request a Quote for Industrial Sourcing",
  description:
    "Submit an RFQ to Safar Exports for industrial metals, machinery, packaging materials, scrap, industrial raw materials, or custom sourcing requirements.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Send your sourcing requirement for review."
        description="Share product details, specification, quantity, destination, and timeline. The clearer the RFQ, the faster we can assess sourcing and export feasibility."
        breadcrumbs={[{ label: "Request a Quote" }]}
        cta={<RFQWizardLauncher label="Use the guided RFQ form" />}
      />
      <LeadCTA />

      <section className="section-pad-sm" style={{ backgroundColor: "var(--color-dark-bg)", borderTop: "1px solid var(--color-dark-border)" }}>
        <div className="container-site contact-info-grid">
          {[
            { label: "Location", value: `${siteConfig.address.city}, ${siteConfig.address.state}, ${siteConfig.address.country}` },
            { label: "Trade inquiries", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
            { label: "Phone / WhatsApp", value: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}` },
            { label: "Buyer note", value: "For accurate review, include specification, quantity, destination, and required timeline." },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="eyebrow">{label}</p>
              {href ? <a href={href} className="contact-dark-link">{value}</a> : <p className="contact-dark-text">{value}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
