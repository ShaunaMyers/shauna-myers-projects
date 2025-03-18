/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.prod.website-files.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
