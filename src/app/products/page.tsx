import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsGrid from "@/components/ProductsGrid";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Industrial Sourcing Capabilities",
  description:
    "Explore Safar Exports sourcing capabilities across four categories: industrial metals, machinery and equipment, industrial materials, and general industrial sourcing.",
  alternates: { canonical: `${siteConfig.url}/products` },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sourcing capabilities"
        title="Industrial categories built around buyer requirements."
        description="Safar Exports is not a catalogue business. We help procurement teams define requirements, identify suitable supply, and coordinate export for industrial products."
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
