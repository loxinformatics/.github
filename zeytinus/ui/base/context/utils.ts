import chalk from "chalk";
import type { FetchDataOptions } from "./types";

export const imagesRemotePatterns = [
  {
    protocol: (process.env.NEXT_PUBLIC_API_PROTOCOL as "http" | "https") || "http",
    hostname: process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost",
    port: process.env.NEXT_PUBLIC_API_PORT || "",
    pathname: "/**",
  },
];

export const serverActionsAllowedOrigins = [
  `localhost:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  `127.0.0.1:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  process.env.NEXT_PUBLIC_WEB_HOST,
].filter((origin): origin is string => Boolean(origin));

export const apiURL =
  `${process.env.NEXT_PUBLIC_API_PROTOCOL || "http"}://` +
  `${process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost"}` +
  `${process.env.NEXT_PUBLIC_API_PORT ? ":" + process.env.NEXT_PUBLIC_API_PORT : ""}` +
  `${
    !!process.env.NEXT_PUBLIC_API_BASEPATH
      ? "/" + process.env.NEXT_PUBLIC_API_BASEPATH.replace(/^\/+|\/+$/g, "")
      : ""
  }`;

export const baseApiURL = `${apiURL}/base`;
export const homeURL = process.env.NEXT_PUBLIC_HOME_URL || "/";

export async function fetchData<T>(options: FetchDataOptions): Promise<T | null> {
  const { endpoint, extra_action } = options;
  const revalidate = options.revalidate ?? (process.env.ENVIRONMENT === "development" ? 0 : 300);

  try {
    const response = await fetch(`${endpoint}${extra_action ? extra_action + "/" : ""}`, {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint} data`);
    }

    const data = await response.json();
    return (data as T) || null;
  } catch (error) {
    console.warn(chalk.yellow(error));
    return null;
  }
}

// TODO: Add a named export 'FetchMultiple'
