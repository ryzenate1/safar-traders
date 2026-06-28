import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {},
  experimental: {
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      { source: "/products/industrial-metals", destination: "/products/metals-alloys", permanent: true },
      { source: "/products/industrial-materials", destination: "/products/industrial-raw-materials", permanent: true },
      { source: "/products/general-sourcing", destination: "/products/custom-sourcing", permanent: true },
      { source: "/products/packaging-materials", destination: "/products/packaging-commercial-supplies", permanent: true },
      { source: "/products/industrial-scrap", destination: "/products/industrial-scrap-recyclable-materials", permanent: true },
      { source: "/products/ferrous-metals", destination: "/products/metals-alloys", permanent: true },
      { source: "/products/non-ferrous-metals", destination: "/products/metals-alloys", permanent: true },
      { source: "/products/plastics", destination: "/products/industrial-raw-materials", permanent: true },
      { source: "/products/paper-cardboard", destination: "/products/industrial-scrap-recyclable-materials", permanent: true },
    ];
  },
};

export default nextConfig;
