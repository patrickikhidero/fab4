import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Optimize hydration by ensuring consistent rendering
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Ensure consistent rendering between server and client
  compiler: {
    // Remove console.logs in production to prevent hydration issues
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
