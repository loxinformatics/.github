import type { MetadataRoute } from "next";
import { fetchBase } from "../../olyv/base/app/server";
import type { ManifestResponse } from "../../olyv/base/app/types";
import olyvConfig from "../../olyv/config";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const manifest: ManifestResponse = await fetchBase("manifest");

  return {
    name: manifest?.full_name,
    short_name: manifest?.short_name,
    description: manifest?.motto_description,
    start_url: olyvConfig.endpoints.home,
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
