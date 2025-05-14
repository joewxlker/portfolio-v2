import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL as "http" | "https",
        hostname: process.env.IMAGE_HOST as string,
        port: process.env.IMAGE_PORT,
        pathname: process.env.IMAGE_PATHNAME,
      },
    ],
    dangerouslyAllowSVG: true
  },
  async rewrites() {
    return [
      {
        source: "/api/smtp",
        destination: `${process.env.EMAIL_SERVER_URL!}/api/smtp`
      }
    ]
  }
};

export default nextConfig;