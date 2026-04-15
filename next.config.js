/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://app.useezly.com/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
