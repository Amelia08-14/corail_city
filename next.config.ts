import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // L'hébergement cPanel (CageFS) limite sévèrement le nombre de processus/threads
  // autorisés par compte : Next.js plantait en essayant de lancer un worker
  // jest-worker par cœur CPU détecté ("spawn ... EAGAIN"). On le force à 1 seul.
  experimental: {
    cpus: 1,
    // Les workers par défaut (child_process forkés) ne semblent pas hériter de
    // RAYON_NUM_THREADS sur cet hébergement et plantent (SIGABRT silencieux).
    // Les worker_threads partagent le même process OS, donc les variables
    // d'environnement et le quota NPROC du compte sont respectés.
    workerThreads: true,
  },
  // Le typecheck de `next build` lance `tsc` dans un processus enfant, ce que
  // l'hébergement refuse ("spawn ... EAGAIN"). On le saute au build : le typecheck
  // se fait en local avec `npx tsc --noEmit` avant chaque déploiement.
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // cPanel/CloudLinux (CageFS) virtualise le système de fichiers : la résolution
    // des symlinks via realpath() sort de la prison et casse le plugin interne de
    // Next.js qui lit les "paths" du tsconfig. On définit l'alias "@/*" nous-mêmes
    // avec un chemin absolu pour court-circuiter ce plugin.
    config.resolve.symlinks = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
