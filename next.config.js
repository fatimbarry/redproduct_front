/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: false
  }
};

module.exports = nextConfig;