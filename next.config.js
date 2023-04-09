/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "i.imgur.com"],
  },
};

module.exports = nextConfig;
