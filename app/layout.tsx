import { Auth, fetchAuth } from "@/zeytinus/ui/auth/context";
import type { AuthData } from "@/zeytinus/ui/auth/context/types";
import { Base, fetchBase } from "@/zeytinus/ui/base/context";
import type { BaseData, BaseMetadata } from "@/zeytinus/ui/base/context/types";
import { ScrollToTop } from "@/zeytinus/ui/base/ScrollToTop";
import { Core } from "@/zeytinus/ui/core/context";
import type { Metadata } from "next";
import "./global.css";

export async function generateMetadata(): Promise<Metadata> {
  const meta: BaseMetadata = await fetchBase("metadata");

  return {
    title: meta?.full_name,
    description: meta?.motto,
    metadataBase: new URL(meta?.website || "https://www.treeolive.tech"),
    applicationName: meta?.full_name,
    // keywords: ["technology", "software", "services"],
    authors: [
      {
        name: "Treeolive Technologies",
        url: meta?.website || "https://www.treeolive.tech",
      },
    ],
    creator: "Treeolive Technologies",
    publisher: "Treeolive Technologies",
    generator: "Next.js",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
    },
    icons: {
      icon: meta?.favicon,
      apple: meta?.apple_touch_icon,
    },
    openGraph: {
      title: meta?.full_name,
      description: meta?.motto,
      url: meta?.website,
      images: [{ url: meta?.og_image || "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.full_name,
      description: meta?.motto,
      images: [meta?.twitter_image || ""],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const baseData: BaseData = await fetchBase();
  const authData: AuthData = await fetchAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-body dark:bg-body-reverse text-color dark:text-color-reverse">
        <Base {...baseData}>
          <Auth {...authData}>
            <Core>{children}</Core>
          </Auth>
          <ScrollToTop />
        </Base>
      </body>
    </html>
  );
}
