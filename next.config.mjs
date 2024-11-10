/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // https://nextjs.org/docs/pages/api-reference/next-config-js/output
    // Next.js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules. 
    output: "standalone",
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        return config;
    },
};

export default nextConfig;