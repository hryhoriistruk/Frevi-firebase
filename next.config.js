/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Увімкнути статичний експорт
  output: 'export',

  // Налаштування для збірки
  distDir: 'out', // Папка для експортованих файлів

  // Оптимізація зображень (вимкнути для статичного експорту)
  images: {
    unoptimized: true,
  },

  // Налаштування для ігнорування помилок під час збірки
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Додаткові налаштування для Firebase
  trailingSlash: true, // Додає слеш в кінці URL
}

module.exports = nextConfig