import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ResourcesGrid from "@/components/ResourcesGrid";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Buyer Resources for Industrial Importers",
  description:
    "Practical buyer resources for RFQ preparation, export documentation, pre-shipment inspection, packing, logistics, trade terms, and industrial sourcing.",
  alternates: { canonical: `${siteConfig.url}/resources` },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="BUYER RESOURCES"
        title="Practical notes for procurement teams."
        description="Short, buyer-focused guidance on RFQ preparation, documentation, inspection, packing, and export coordination."
        breadcrumbs={[{ label: "Resources" }]}
      />
      <section className="section-pad bg-white">
        <div className="container-site"><ResourcesGrid /></div>
      </section>
    </>
  );
}
