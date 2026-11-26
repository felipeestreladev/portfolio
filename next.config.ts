import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // gera a pasta .next/standalone para rodar em contêiner
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
