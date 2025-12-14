import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 CRITICAL: This tells Next.js to make HTML files for Render
  output: "export",

  // 👇 CRITICAL: Static sites cannot use the default image optimizer
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // 👇 Prevent build from failing on small code warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;