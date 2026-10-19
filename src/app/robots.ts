import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brakechambers.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: [
          'Googlebot-Image',
          'Bingbot-Image',
          'msnbot-media',
          'Baiduspider-image',
          'YandexImages',
        ],
        allow: [
          '/favicon.ico',
          '/favicon-48x48.png',
          '/favicon-96x96.png',
          '/icon-192.png',
          '/icon-512.png',
          '/icon.png',
          '/apple-touch-icon.png',
          '/images/logo-brc.png',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

