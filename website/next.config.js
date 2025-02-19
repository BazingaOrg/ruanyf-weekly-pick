/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.beekka.com",
        pathname: "/blogimg/**",
      },
      {
        protocol: "https",
        hostname: "puui.qpic.cn",
        pathname: "/vpic_cover/**",
      },
    ],
  },
  // 允许加载外部图片
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  typescript: {
    // 在生产构建时忽略类型检查错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
