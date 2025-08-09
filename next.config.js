/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  // Skip all dynamic routes during export
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' },
      // Add all your static routes here
    };

    // Explicitly exclude dynamic routes
    const excludedRoutes = [
      '/chat/[chatId]',
      '/chat/[...fallback]'
    ];

    excludedRoutes.forEach(route => {
      delete paths[route];
    });

    return paths;
  },
};

module.exports = nextConfig;