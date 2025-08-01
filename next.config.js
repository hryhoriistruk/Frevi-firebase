/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI
    },
    webpack: (config, { isServer }) => {
        // Добавляем алиасы для импортов
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': __dirname,
        };

        // Оптимизация только для клиентской сборки
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                maxSize: 244 * 1024, // 244KB
            };
        }

        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false
        };

        return config;
    }
}

module.exports = nextConfig;