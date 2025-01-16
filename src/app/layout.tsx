import { Auth, fetchAuth } from "@/zeytinus/app/auth/context";
import type { AuthData } from "@/zeytinus/app/auth/context/types";
import { Base, fetchBase } from "@/zeytinus/app/base/context";
import type { BaseData, BaseMetadata } from "@/zeytinus/app/base/context/types";
import { ScrollToTop } from "@/zeytinus/app/base/ScrollToTop";
import { Core } from "@/zeytinus/app/core/context";
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
      icon: meta?.favicon || "/app/favicon.ico",
      apple: meta?.apple_touch_icon || "/app/apple.png",
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
