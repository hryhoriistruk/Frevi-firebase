/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Додайте цю лінію для статичного експорту
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;