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
};

module.exports = nextConfig;
