/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpackDevMiddleware: (config) => {
    config.client = {
      ...config.client,
      overlay: false, // 에러 오버레이 비활성화
    };
    return config;
  },
};

export default nextConfig;
