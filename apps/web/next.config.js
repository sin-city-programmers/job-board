//@ts-check

// const { composePlugins, withNx } = require('@nx/next');

// * @type {import('@nx/next/plugins/with-nx').WithNxOptions}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // If readding withNx: https://nx.dev/recipes/next/next-config-setup
  // nx: {},
  // webpack over Turbopack for Nx compatibility
  webpack: (config, { isServer }) => {
    return config;
  },
};

// Add if using shared workspace libraries
// const plugins = [withNx];

// Spread plugins back in if uncommenting above
// module.exports = composePlugins(...plugins)(nextConfig);
module.exports = nextConfig;
