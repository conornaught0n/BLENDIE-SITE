import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false, // DISABLED to ensure flat .html files (shop.html) match our hardcoded links
};

export default nextConfig;
