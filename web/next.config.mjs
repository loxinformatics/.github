/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "127.0.0.1", port: "8000", pathname: "/**" },
            { hostname: "localhost", port: "8000", pathname: "/**" },
            { hostname: "loxinformatics.com", port: "", pathname: "/**" },
            { hostname: "www.loxinformatics.com", port: "", pathname: "/**" },
        ],
    },
};

export default nextConfig;
