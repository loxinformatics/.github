import type { NextConfig } from "next";
import {
  imagesRemotePatterns,
  serverActionsAllowedOrigins,
} from "./olyv/utils/base";

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
