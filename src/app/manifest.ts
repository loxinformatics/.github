import { fetchBase } from "@/olyv/providers/base";
import type { BaseManifest } from "@/olyv/providers/base/types";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const manifest: BaseManifest = await fetchBase("manifest");

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
        src: manifest?.pwa_192 || "/app/img/pwa_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.pwa_512 || "/app/img/pwa_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.apple_touch_icon || "/app/img/apple.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
