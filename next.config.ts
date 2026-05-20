import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    optimizePackageImports: ["@tabler/icons-react", "lucide-react", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
export default nextConfig;
