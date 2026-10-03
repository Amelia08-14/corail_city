import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // cPanel/CloudLinux (CageFS) virtualise le système de fichiers : la résolution
    // des symlinks via realpath() sort de la prison et casse les alias "@/*".
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
