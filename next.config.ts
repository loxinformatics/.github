import type { NextConfig } from "next";
import olyvConfig from "./olyv/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...olyvConfig.imagesRemotePatterns],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [...olyvConfig.serverActionsAllowedOrigins],
    },
  },
};

export default nextConfig;
