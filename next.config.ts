import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DJANGO_URL:
      `${(process.env.DJANGO_PROTOCOL as "http" | "https") || "http"}://` +
      `${process.env.DJANGO_HOST?.replace(/\/+$/, "") || "localhost"}` +
      `${process.env.DJANGO_PORT ? ":" + process.env.DJANGO_PORT : ""}` +
      `${
        !!process.env.DJANGO_BASE_URLPATH
          ? "/" + process.env.DJANGO_BASE_URLPATH.replace(/^\/+|\/+$/g, "")
          : ""
      }`,
  },
  images: {
    remotePatterns: [
      {
        protocol: (process.env.DJANGO_PROTOCOL as "http" | "https") || "http",
        hostname: process.env.DJANGO_HOST?.replace(/\/+$/, "") || "localhost",
        port: process.env.DJANGO_PORT || "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        `localhost:${process.env.NEXT_PROTOCOL || "3000"}`,
        `127.0.0.1:${process.env.NEXT_PORT || "3000"}`,
        process.env.NEXT_HOST,
      ].filter((origin): origin is string => Boolean(origin)),
    },
  },
};

export default nextConfig;
