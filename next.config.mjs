/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compress: true,
  // HTTP→HTTPS: use `public/.htaccess` (redirects in next.config are not emitted with output: 'export')
  /** Allow testing on phone via LAN IP (e.g. http://192.168.6.250:3000) during `npm run dev`. */
  allowedDevOrigins: ['192.168.*.*', '192.168.6.250', '192.168.5.128', 'localhost', '127.0.0.1'],
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
