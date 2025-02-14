import { fetchBase } from "@treeolyv/web/base/app/server";
import type { ManifestResponse } from "@treeolyv/web/base/app/types";
import conf from "@treeolyv/web/config";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const manifest: ManifestResponse = await fetchBase("manifest");

  return {
    name: manifest?.full_name,
    short_name: manifest?.short_name,
    description: manifest?.motto_description,
    start_url: conf.endpoints.home,
    display: "standalone",
    background_color: "#ffffff",
    icons: [
      {
        src: manifest?.pwa_192_image || "/pwa_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.pwa_512_image || "/pwa_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.apple_image || "/apple.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
