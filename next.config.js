const nextConfig = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };

    return config;
  },
};

module.exports = nextConfig;
