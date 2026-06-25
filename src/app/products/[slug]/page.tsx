import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import { getProductCategory, productCategories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.metaDescription,
    alternates: { canonical: `${siteConfig.url}/products/${category.slug}` },
    openGraph: {
      title: category.seoTitle,
      description: category.metaDescription,
      url: `${siteConfig.url}/products/${category.slug}`,
      type: "website",
    },
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) notFound();

  return <ProductDetailPage category={category as NonNullable<typeof category>} />;
}
