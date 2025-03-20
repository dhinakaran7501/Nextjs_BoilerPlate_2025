import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: false,
  transpilePackages: ["swagger-ui-react"],
};

export default nextConfig;
