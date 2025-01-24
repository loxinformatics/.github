import { fetchAuth } from "@/olyv/api/auth";
import { fetchBase } from "@/olyv/api/base";
import { AuthProvider } from "@/olyv/app/auth/context";
import { BaseProvider } from "@/olyv/app/base/context";
import type { AuthReponse } from "@/olyv/types/auth";
import type { BaseResponse, MetadataResponse } from "@/olyv/types/base";
import type { Metadata } from "next";
import "./glob.css";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetadataResponse = await fetchBase("metadata");

  return {
    title: meta?.full_name,
    description: meta?.motto,
    metadataBase: new URL(meta?.website || "https://www.loxinformatics.co.ke"),
    applicationName: meta?.full_name,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseData: BaseResponse = await fetchBase();
  const authData: AuthReponse = await fetchAuth();

  return (
    <BaseProvider {...baseData}>
      <AuthProvider {...authData}>{children}</AuthProvider>
    </BaseProvider>
  );
}
