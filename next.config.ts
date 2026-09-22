import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external image domains used as placeholders
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Strict mode for better React error detection
  reactStrictMode: true,
};

export default nextConfig;
