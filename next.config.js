/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/platform/profilepic/**',
      },
    ],
  },
}

module.exports = nextConfig


// Error
// Error: Invalid src prop (https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1465650284048491&height=50&width=50&ext=1701985545&hash=AeSbMobYr5_RcsAadBw)