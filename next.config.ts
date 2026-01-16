import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false, // REVERTED: Hostinger prefers flat .html files, not folder/index.html
};

export default nextConfig;
