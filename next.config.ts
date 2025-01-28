import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:
          (process.env.NEXT_PUBLIC_API_PROTOCOL as "http" | "https") || "http",
        hostname:
          process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost",
        port: process.env.NEXT_PUBLIC_API_PORT || "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        `localhost:${process.env.NEXTJS_PROTOCOL || "3000"}`,
        `127.0.0.1:${process.env.NEXTJS_PORT || "3000"}`,
        process.env.NEXTJS_HOST,
      ].filter((origin): origin is string => Boolean(origin)),
    },
  },
};

export default nextConfig;
