import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';
const withPWAConfig = withPWA({
  dest: 'public',
  register: true, 
  skipWaiting: true,
});
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};
export default bundleAnalyzer(withPWAConfig(nextConfig));