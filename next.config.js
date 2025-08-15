/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    output: 'export', // Розкоментуйте це для статичного експорту
    images: {
        domains: ['firebasestorage.googleapis.com'],
        unoptimized: true, // Обов'язково для статичного експорту
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    trailingSlash: true, // Додайте це для узгодженості з firebase.json
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