import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    externalDir: true
  },
/*  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        // port: '',
        // pathname: '',
        // search: '',
      },
    ],
  },
 */
};

export default nextConfig;
