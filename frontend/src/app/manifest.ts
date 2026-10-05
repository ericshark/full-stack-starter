import type { MetadataRoute } from 'next';

/**
 * Next.js web application manifest generator.
 * Provides progressive web application metadata.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Full-Stack App',
    short_name: 'FullStack',
    description: 'A Next.js + FastAPI full-stack application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
