/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Uncomment if you need static export
    distDir: 'out',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    //output: 'standalone',
    reactStrictMode: true,
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Configure path aliases for @ imports
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': __dirname,
        };

        // Optimization configuration
        config.optimization.splitChunks = false;

        return config;
    }
}

module.exports = nextConfig