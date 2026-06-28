import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Procurement coordination, export documentation, and supplier management — why buyers choose Safar Exports as their trade and export partner.",
  alternates: { canonical: `${siteConfig.url}/why-us` },
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="One partner. Clear process. Reliable coordination."
        description="Buyers working across multiple supplier relationships, documentation requirements, and shipment timelines need a single point of coordination. Here is how we provide it."
        breadcrumbs={[{ label: "Why Choose Us" }]}
      />
      <WhyChooseUs showHeader={false} />
      <LeadCTA />
    </>
  );
}
