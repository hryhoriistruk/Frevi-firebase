/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },

    // Configure path aliases for @ imports
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': __dirname,
        };
        return config;
    },
}
module.exports = {
    distDir: '.next',
    output: 'standalone',
    webpack: (config) => {
        config.optimization.splitChunks = false;
        return config;
    }
};
module.exports = nextConfig
