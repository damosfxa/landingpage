import { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  // Dari konstanta bersama, bukan env Vercel, supaya tidak ikut berubah
  // mengikuti URL preview deployment.
  const baseUrl = SITE_URL

  return [
    {
      // Tanpa garis miring di akhir, supaya sama persis dengan canonical
      // yang dihasilkan `alternates.canonical` di layout.
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
