import type { MetadataRoute } from 'next';

/**
 * Next.js dynamic robots.txt route handler.
 * Configures search engine crawler rules.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
  };
}
