import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode for better development warnings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production builds
  },
  // Add env configuration to expose environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001",
  },
  /* config options here */
};

export default nextConfig;
