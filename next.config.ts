import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    REST_URL:
      `${(process.env.REST_PROTOCOL as "http" | "https") || "http"}://` +
      `${process.env.REST_HOST?.replace(/\/+$/, "") || "localhost"}` +
      `${process.env.REST_PORT ? ":" + process.env.REST_PORT : ""}` +
      `${
        !!process.env.REST_PATH
          ? "/" + process.env.REST_PATH.replace(/^\/+|\/+$/g, "")
          : ""
      }`,
  },
  images: {
    remotePatterns: [
      {
        protocol: (process.env.REST_PROTOCOL as "http" | "https") || "http",
        hostname: process.env.REST_HOST?.replace(/\/+$/, "") || "localhost",
        port: process.env.REST_PORT || "",
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
