/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, options) => {
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'source-map';
    }
    return config;
  },
};

module.exports = nextConfig;
