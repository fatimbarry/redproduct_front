/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;