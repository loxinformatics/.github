import { fetchBase } from "@/zeytinus/ui/base/context";
import type { BaseManifest } from "@/zeytinus/ui/base/context/types";
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
        src: manifest?.pwa_192 || "",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.pwa_512 || "",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: manifest?.apple_touch_icon || "",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
