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
  // async redirects() {
  //   return [
  //     {
  //       source: '/fr',
  //       destination: '/',
  //       permanent: true, // or false if you want a temporary redirect
  //     },
  //   ];
  // },
};

export default nextConfig;
