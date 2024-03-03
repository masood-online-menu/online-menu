/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onlinemenu.storage.iran.liara.space',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
