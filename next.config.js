const withNextIntl = require("next-intl/plugin")("./src/i18n.ts"); // 指定`i18n.ts`配置文件的路径
const { withContentlayer } = require("next-contentlayer");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
};

module.exports = withNextIntl(withContentlayer(withBundleAnalyzer(nextConfig)));
