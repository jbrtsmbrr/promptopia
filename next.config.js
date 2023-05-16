/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    GOGGLE_CLIENT_ID:
      "448530442700-2j5pll8ni2lka71hhm4as3h0197d7vn9.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
};

module.exports = nextConfig;
