import { fetchManifest } from "@/components/base/management/actions";
import type { ManifestResponse } from "@/components/base/management/types";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const manifest: ManifestResponse = await fetchManifest();

  return {
    name: manifest?.full_name,
    short_name: manifest?.short_name,
    description: manifest?.motto_description,
    start_url: "/",
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
