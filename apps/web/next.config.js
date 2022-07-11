const withTM = require("next-transpile-modules")();
const path = require("path");
/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "cdn2.iconfinder.com",
      "cdn0.iconfinder.com",
      "assets.reedpopcdn.com",
      "static.thenounproject.com",
    ],
  },
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = [
        "wagmi",
        "ethers",
        "@headlessui/react",
        ...config.externals,
      ];
    }
    config.resolve.alias["wagmi"] = path.resolve(
      __dirname,
      ".",
      "node_modules",
      "wagmi"
    );
    config.resolve.alias["ethers"] = path.resolve(
      __dirname,
      ".",
      "node_modules",
      "ethers"
    );
    config.resolve.alias["@headlessui/react"] = path.resolve(
      __dirname,
      ".",
      "node_modules",
      "@headlessui/react"
    );
    return config;
  },
});
