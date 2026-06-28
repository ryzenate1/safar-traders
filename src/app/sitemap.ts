import type { MetadataRoute } from "next";
import { productCategories } from "@/lib/products";
import { resourceGuides } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
  { url: `${siteConfig.url}/products`, changeFrequency: "weekly", priority: 0.95 },
  { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.95 },
  { url: `${siteConfig.url}/export-process`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteConfig.url}/why-us`, changeFrequency: "monthly", priority: 0.75 },
  { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${siteConfig.url}/resources`, changeFrequency: "monthly", priority: 0.65 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const capabilityRoutes = productCategories.map((category) => ({
    url: `${siteConfig.url}/products/${category.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const resourceRoutes = resourceGuides.map((guide) => ({
    url: `${siteConfig.url}/resources/${guide.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route: MetadataRoute.Sitemap[number]) => ({ ...route, lastModified })),
    ...capabilityRoutes,
    ...resourceRoutes,
  ];
}
