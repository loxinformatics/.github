import type { NextConfig } from "next";
import { imagesRemotePatterns, serverActionsAllowedOrigins } from "./zeytinus/ui/base/context/utils";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...imagesRemotePatterns],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [...serverActionsAllowedOrigins],
    },
  },
};

export default nextConfig;
