/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trigger rebuild to clear stale cache
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        hostname: 'firebasestorage.googleapis.com'
      },
    ],
  },
}

export default nextConfig
