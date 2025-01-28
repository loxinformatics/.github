import { fetchAuth } from "@/components/auth/actions";
import { AuthProvider } from "@/components/auth/context";
import type { AuthReponse } from "@/components/auth/types";
import { fetchBase, fetchMetadata } from "@/components/base/actions";
import { BaseProvider } from "@/components/base/context";
import type { BaseResponse, MetadataResponse } from "@/components/base/types";
import ScrollTop from "@/components/base/widgets/buttons/ScrollTop";
import type { Metadata } from "next";
import "./global.css";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetadataResponse = await fetchMetadata();

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
  const authData: AuthReponse = await fetchAuth();

  return (
    <BaseProvider {...baseData}>
      <AuthProvider {...authData}>{children}</AuthProvider>
      <ScrollTop />
    </BaseProvider>
  );
}
