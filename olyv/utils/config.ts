// Define images remote patterns
export const imagesRemotePatterns = [
  {
    protocol:
      (process.env.NEXT_PUBLIC_API_PROTOCOL as "http" | "https") || "http",
    hostname:
      process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost",
    port: process.env.NEXT_PUBLIC_API_PORT || "",
    pathname: "/**",
  },
];

// Define server actions allowed origins
export const serverActionsAllowedOrigins = [
  `localhost:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  `127.0.0.1:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  process.env.NEXT_PUBLIC_WEB_HOST,
].filter((origin): origin is string => Boolean(origin));

