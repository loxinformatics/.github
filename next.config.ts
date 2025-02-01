import type { NextConfig } from "next";
import conf from "./olyv/config";

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
