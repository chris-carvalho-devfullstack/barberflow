import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para permitir imagens externas (como a foto do Google)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com", // Cobre outras variações de servidores do Google
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
