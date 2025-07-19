/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI
    },
    webpack: (config, { isServer }) => {
        // Додаємо аліаси для імпортів
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': __dirname,
        };

        // Оптимізація тільки для клієнтської збірки
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                maxSize: 244 * 1024, // 244KB
            };
        }

        return config;
    }
}

module.exports = nextConfig