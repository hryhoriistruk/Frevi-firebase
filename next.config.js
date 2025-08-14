/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    output: 'export', // Генерує статичний HTML/CSS/JS
    images: {
        domains: ['firebasestorage.googleapis.com'],
        unoptimized: true, // Додайте це для статичного експорту
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@lib': path.resolve(__dirname, 'lib'),
            '@/lib': path.resolve(__dirname, 'lib'),
        };
        return config;
    },
};

module.exports = nextConfig;