import { ScrollToTop } from "@/olyv/app/base/ScrollToTop";
import { Auth, fetchAuth } from "@/olyv/providers/auth";
import { Base, fetchBase } from "@/olyv/providers/base";
import { Core } from "@/olyv/providers/core";

import type { AuthData } from "@/olyv/providers/auth/types";
import type { BaseData, BaseMetadata } from "@/olyv/providers/base/types";
import type { Metadata } from "next";

import "./global.css";

export async function generateMetadata(): Promise<Metadata> {
  const meta: BaseMetadata = await fetchBase("metadata");

  return {
    title: meta?.full_name,
    description: meta?.motto,
    metadataBase: new URL(meta?.website || "https://www.loxinformatics.co.ke"),
    applicationName: meta?.full_name,
    // keywords: ["technology", "software", "services"],
    authors: [
      {
        name: "Lox Informatics",
        url: meta?.website || "https://www.loxinformatics.co.ke",
      },
    ],
    creator: "Lox Informatics",
    publisher: "Lox Informatics",
    generator: "Next.js",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
    },
    icons: {
      icon: meta?.favicon || "/app/img/favicon.ico",
      apple: meta?.apple_touch_icon || "/app/img/apple.png",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
