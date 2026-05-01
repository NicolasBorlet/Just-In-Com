import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'precious-cats-888e8b9726.strapiapp.com' },
      { protocol: 'https', hostname: 'precious-cats-888e8b9726.media.strapiapp.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      ...(process.env.DOMAIN ? [{ protocol: 'https' as const, hostname: process.env.DOMAIN }] : []),
    ],
  },
  async rewrites() {
    return [
      { source: '/', destination: '/fr' },
      { source: '/mariage', destination: '/fr/mariage' },
      { source: '/blog', destination: '/fr/blog' },
      { source: '/blog/:slug', destination: '/fr/blog/:slug' },
      { source: '/a-propos', destination: '/fr/a-propos' },
      { source: '/contact', destination: '/fr/contact' },
      { source: '/professionnels', destination: '/fr/professionnels' },
    ];
  },
  async redirects() {
    return [
      { source: '/fr', destination: '/', permanent: true },
      { source: '/fr/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
