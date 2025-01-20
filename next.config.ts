import type { NextConfig } from "next";
import {
  imagesRemotePatterns,
  serverActionsAllowedOrigins,
} from "./olyv/providers/base/config";

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
