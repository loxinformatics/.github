/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps:
    process.env.NEXT_PUBLIC_DEBUG === "True" ? false : true,
  optimizeFonts: process.env.NEXT_PUBLIC_DEBUG === "True" ? false : true,

  images: {
    remotePatterns:
      process.env.NEXT_PUBLIC_DEBUG === "True"
        ? [
            { hostname: "127.0.0.1", port: "8000", pathname: "/**" },
            { hostname: "localhost", port: "8000", pathname: "/**" },
            { hostname: `${process.env.NEXT_PUBLIC_IP_ADDRESS}`, port: "8000", pathname: "/**" },
          ]
        : [
            {
              hostname: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
              port: "",
              pathname: "/**",
            },
            {
              hostname: `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
              port: "",
              pathname: "/**",
            },
          ],
    disableStaticImages:
      process.env.NEXT_PUBLIC_DEBUG !== "True" ? false : true,
  },
  experimental: {
    optimizeCss: process.env.NEXT_PUBLIC_DEBUG === "True" ? false : true,
  },
};

export default nextConfig;
