import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Re-enabled: Industry standard for static hosting (folder/index.html)
};

export default nextConfig;
