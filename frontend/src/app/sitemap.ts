import type { MetadataRoute } from 'next';

/**
 * Next.js dynamic sitemap.xml generator.
 * Produces sitemap entries for search indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
