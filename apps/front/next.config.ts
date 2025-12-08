import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.DOMAIN}`,
      'precious-cats-888e8b9726.strapiapp.com',
      'precious-cats-888e8b9726.media.strapiapp.com'
    ]
  },
  async redirects() {
    return [
      {
        source: '/fr',
        destination: '/',
        permanent: true, // or false if you want a temporary redirect
      },
      {
        source: '/fr/blog',
        destination: '/blog',
        permanent: true, // or false if you want a temporary redirect
      },
      {
        source: '/fr/mariage',
        destination: '/mariage',
        permanent: true, // or false if you want a temporary redirect
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
