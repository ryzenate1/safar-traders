import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsGrid from "@/components/ProductsGrid";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Capabilities | Safar Exports",
  description:
    "Explore Safar Exports sourcing scope across 8 industrial and commercial categories — metals and alloys, industrial scrap, machinery, construction materials, raw materials, engineering components, packaging, and custom sourcing.",
  alternates: { canonical: `${siteConfig.url}/products` },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Sourcing and supply support across 8 categories."
        description="We work from your requirement, not a catalogue. Submit a specification and we coordinate supplier identification, quotation, documentation, and supply handling."
        breadcrumbs={[{ label: "Capabilities" }]}
      />

      <section style={{ backgroundColor: "var(--color-bg)", paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="container-site">
          <ProductsGrid />
        </div>
      </section>
      <LeadCTA />
    </>
  );
}
