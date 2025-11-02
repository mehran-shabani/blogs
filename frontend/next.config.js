/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ???????? ?? RTL
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
  // ??????? ?????
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
