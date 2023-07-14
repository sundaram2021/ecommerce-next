/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'http',
            hostname: "img.bbystatic.com",
          },
          {
            protocol: 'https',
            hostname: "www.google.com",
          },
          {
            protocol: 'https',
            hostname: "images.clerk.dev",
          }
        ],
      },
}

module.exports = nextConfig
