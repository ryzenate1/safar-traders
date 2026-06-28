import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExportProcess from "@/components/ExportProcess";
import ProductCategories from "@/components/ProductCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeadCTA from "@/components/LeadCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Trade & Export Support for Serious Buyers | Safar Exports",
  description:
    "Safar Exports supports buyer-led sourcing, procurement coordination, and export supply for non-perishable industrial and commercial requirements.",
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <ExportProcess />
      <WhyChooseUs />
      <LeadCTA />
    </>
  );
}
