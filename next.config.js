/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,

  // Додаємо webpack конфігурацію для алиаса @
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    return config
  }
};

module.exports = nextConfig;