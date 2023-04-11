const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };

    config.plugins.push(
      new NextFederationPlugin({
        name: "web",
        remotes: {
          cart: `cart@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        shared: {},
      })
    );

    return config;
  },
};

module.exports = nextConfig;
