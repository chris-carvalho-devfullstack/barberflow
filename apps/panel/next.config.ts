import type { NextConfig } from "next";
import path from "path";

const monorepoRoot = path.resolve(__dirname, "../..");

const nextConfig: NextConfig = {
  output: "standalone",

  // necessário pro monorepo (mesmo simplificado)
  outputFileTracingRoot: monorepoRoot,

  // necessário pro OpenNext + Cloudflare (npm)
  outputFileTracingIncludes: {
    "*": ["./node_modules/**"],
  },

  // 🔥 ESSENCIAL: evita build quebrar por lint
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;