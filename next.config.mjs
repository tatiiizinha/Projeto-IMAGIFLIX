/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
      },
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default nextConfig
