/** @type {import("next").NextConfig} */
const nextConfig = {
    // output: "export",
	// distDir: "core/_next/build",
    images: {
        remotePatterns: [
            { hostname: "127.0.0.1", port: "8000", pathname: "/**" },
            { hostname: "localhost", port: "8000", pathname: "/**" },
            { hostname: "api.loxinformatics.com", port: "", pathname: "/**" },
        ],
    },
};

export default nextConfig;
