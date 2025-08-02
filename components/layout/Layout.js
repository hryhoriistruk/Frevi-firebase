/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Allow imports from parent directories
        config.resolve.alias = {
            ...config.resolve.alias,
            '@shared': path.resolve(__dirname, '../Frevi-firebase899889'),
        };

        return config;
    },
    // If you're using experimental features
    experimental: {
        externalDir: true,
    },
};

const path = require('path');

module.exports = nextConfig;