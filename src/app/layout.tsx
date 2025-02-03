import { _Auth } from "../../olyv/_auth/app";
import { Base } from "@lox-informatics/olyv/base/app";
import { fetch_Auth } from "../../olyv/_auth/app/server";
import { fetchBase } from "../../olyv/base/app/server";

import type { Metadata } from "next";
import type { _AuthResponse } from "../../olyv/_auth/app/types";
import type { BaseResponse, MetadataResponse } from "../../olyv/base/app/types";

import localFont from "next/font/local";
import "./global.css";

const PreloSlab = localFont({
  src: [
    {
      path: "./ui/fonts/preloslab-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ui/fonts/preloslab-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetadataResponse = await fetchBase("metadata");

  return {
    title: meta?.full_name,
    description: meta?.motto_description,
    metadataBase: new URL(
      meta?.website_URL || "https://www.loxinformatics.co.ke"
    ),
    applicationName: meta?.full_name,
    authors: [
      {
        name: "Lox Informatics",
        url: meta?.website_URL || "https://www.loxinformatics.co.ke",
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
      icon: meta?.favicon_image || "/favicon.ico",
      apple: meta?.apple_image || "/apple.png",
    },
    openGraph: {
      title: meta?.full_name,
      description: meta?.motto_description,
      url: meta?.website_URL,
      images: [{ url: meta?.og_image || "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.full_name,
      description: meta?.motto_description,
      images: [meta?.X_image || ""],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseData: BaseResponse = await fetchBase();
  const authData: _AuthResponse = await fetch_Auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
              bg-body dark:bg-body-reverse
              ${PreloSlab.className} antialiased
            `}
      >
        <Base {...baseData}>
          <_Auth {...authData}>{children}</_Auth>
        </Base>
      </body>
    </html>
  );
}
