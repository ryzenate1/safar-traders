import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Sourcing capability, export documentation, logistics coordination — why international buyers choose us as their industrial trading and export partner.",
  alternates: { canonical: `${siteConfig.url}/why-us` },
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="Built for buyers who need it done right."
        description="International trade demands accuracy, documentation, and reliable communication. Here is how we deliver on each."
        breadcrumbs={[{ label: "Why Choose Us" }]}
      />
      <WhyChooseUs showHeader={false} />
      <LeadCTA />
    </>
  );
}
