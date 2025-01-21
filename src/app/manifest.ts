import { fetchBase } from "@/olyv/api/base";
import type { ManifestResponse } from "@/olyv/types/base";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const manifest: ManifestResponse = await fetchBase("manifest");

  return {
    name: manifest?.full_name,
    short_name: manifest?.short_name,
    description: manifest?.motto,
    start_url: "/",
    display: "standalone",
    background_color: manifest?.background_color,
    theme_color: manifest?.theme_color,
    icons: [
      {
        src: manifest?.pwa_192 || "/app/pwa_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.pwa_512 || "/app/pwa_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.apple_touch_icon || "/app/apple.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
