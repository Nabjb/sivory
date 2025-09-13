/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now stable in Next.js 14, no need for experimental flag
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig