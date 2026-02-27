/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Skip static generation entirely - all routes are dynamic
  skipStaticOptimization: true,
}

module.exports = nextConfig
