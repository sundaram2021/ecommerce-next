/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/stripe-session",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
},
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
