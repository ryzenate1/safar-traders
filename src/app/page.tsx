import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ExportProcess from "@/components/ExportProcess";
import ProductCategories from "@/components/ProductCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Global Industrial Sourcing & Export Partner",
  description:
    "Safar Exports helps international buyers source industrial metals, machinery, packaging materials, industrial scrap, and custom industrial requirements from India.",
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <ExportProcess />
      <TrustStrip />
      <WhyChooseUs />
      <LeadCTA />
    </>
  );
}
