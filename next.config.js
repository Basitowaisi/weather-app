/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  images: {
    domains: ["www.weatherbit.io"],
  },
}

module.exports = nextConfig
