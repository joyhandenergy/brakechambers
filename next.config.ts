/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: '/blogImg/:path*',
        destination: '/blogImage/:path*',
      },
      {
        source: '/products/:file(.*\\.(?:jpg|jpeg|png|webp|svg|gif))',
        destination: '/productsImage/:file',
      },
    ];
  },
  async redirects() {
    return [
      // Explicit manual mappings for the first 10 items
      { source: '/type-3030-standard-1', destination: '/spring-brakes/type-3030-2-12in', permanent: true },
      { source: '/type-3030-long-stroke-2', destination: '/spring-brakes/type-3030-3in', permanent: true },
      { source: '/type-2430-standard-3', destination: '/spring-brakes/type-2430-2-12in', permanent: true },
      { source: '/type-2430-long-stroke-4', destination: '/spring-brakes/type-2430-3in', permanent: true },
      { source: '/type-2024-standard-5', destination: '/spring-brakes/type-2024-2-12in', permanent: true },
      { source: '/type-30-standard-6', destination: '/service-chambers/type-30-2-12in', permanent: true },
      { source: '/type-30-long-stroke-7', destination: '/service-chambers/type-30-3in', permanent: true },
      { source: '/type-24-standard-8', destination: '/service-chambers/type-24-2-12in', permanent: true },
      { source: '/type-20-standard-9', destination: '/service-chambers/type-20-2-12in', permanent: true },
      { source: '/type-16-standard-10', destination: '/service-chambers/type-16-2-12in', permanent: true },
      
      // Consolidation Redirects
      { source: '/oem-cross-reference/visual-guide', destination: '/technical-resources/identification', permanent: true },
      { source: '/oem-cross-reference/interchange', destination: '/oem-cross-reference/part-search', permanent: true },
      { source: '/quality-assurance', destination: '/capabilities', permanent: true },
      
      // Suspended redirects to access application links (KEPT COMMENTED OUT FOR DEV)
      // { source: '/applications/fleet-inquiries', destination: '/capabilities/fleet-inquiries', permanent: true },
      // { source: '/applications/contract-manufacturing', destination: '/capabilities/contract-manufacturing', permanent: true },
      // { source: '/applications/custom-engineering', destination: '/capabilities/custom-engineering', permanent: true },
      
      // Blog Post 301 Permanent Redirects
      { source: '/blog/arctic-mining-success', destination: '/blog/cold-weather-brake-chambers', permanent: true },
      { source: '/blog/how-to-diagnose-air-leaks-spring-brake-chambers', destination: '/blog/diagnose-air-leaks-spring-brake-chambers', permanent: true },
      { source: '/blog/air-disc-brakes-vs-drum-brakes-future-of-trucking', destination: '/blog/air-disc-vs-drum-brakes', permanent: true },
      { source: '/blog/brake-chamber-sizing-guide-type-30-24-16', destination: '/blog/brake-chamber-sizing-guide', permanent: true },
      { source: '/blog/usa-brake-chamber-regulations-fmvss-121-compliance', destination: '/blog/fmvss-121-compliance-importers', permanent: true },
      { source: '/blog/fleet-brake-maintenance-reduce-downtime-save-money', destination: '/blog/fleet-brake-maintenance-guide', permanent: true },
      
      // Accessories
      { source: '/diaphragm-type-30-rubber-diaphragm-a1', destination: '/chamber-parts-kits/diaphragm-type-30-rubber-diaphragm', permanent: true },
      { source: '/diaphragm-type-24-rubber-diaphragm-a2', destination: '/chamber-parts-kits/diaphragm-type-24-rubber-diaphragm', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
