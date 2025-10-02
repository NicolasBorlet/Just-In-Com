import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.DOMAIN}`]
  },
};

export default nextConfig;
