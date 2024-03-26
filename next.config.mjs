/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   esmExternals: 'loose', // <-- add this
  //   serverComponentsExternalPackages: ['mongoose'], // <-- and this
  // },
  // // and the following to enable top-level await support for Webpack
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //     layers: true,
  //   };
  //   return config;
  // },
  images: {
    // domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/git-note/**',
      },
    ],
  },
};

export default nextConfig;
