import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "The official Safar Traders company profile — capabilities, sourcing process, and credentials. Coming soon.",
  alternates: { canonical: `${siteConfig.url}/company-profile` },
};

export default function CompanyProfilePage() {
  return (
    <>
      <PageHero
        eyebrow="Company Profile"
        title="Our full company profile is on its way."
        description="We're putting together a detailed profile covering our capabilities, sourcing process, and credentials — available this month end."
        breadcrumbs={[{ label: "Company Profile" }]}
      />
      <section className="section-pad">
        <div className="container-site" style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="card"
            style={{
              maxWidth: 520,
              width: "100%",
              padding: "2.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "999px",
                background: "var(--color-accent-muted)",
                color: "var(--color-accent)",
              }}
            >
              <FileText size={26} strokeWidth={1.8} />
            </span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>Coming soon this month end</h2>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
              Our downloadable company profile — with sourcing capabilities, process overview, and
              credentials — will be published here shortly. In the meantime, reach out directly and
              our team will share the details you need.
            </p>
          </div>
        </div>
      </section>
      <LeadCTA />
    </>
  );
}
