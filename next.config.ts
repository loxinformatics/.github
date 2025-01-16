import type { NextConfig } from "next";
import {
  imagesRemotePatterns,
  serverActionsAllowedOrigins,
} from "./olyv/context/base/config";

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
