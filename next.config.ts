import conf from "@treeolyv/web/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...conf.imagesRemotePatterns],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [...conf.serverActionsAllowedOrigins],
    },
  },
};

export default nextConfig;
