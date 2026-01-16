import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Enabled to ensure directories with index.html are generated (prevents 403 on folder access)
};

export default nextConfig;
