import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Di-hardcode agar tidak ikut berubah mengikuti env Vercel.
  const baseUrl = 'https://www.byvoxy.com'

  return [
    {
      // Tanpa garis miring di akhir, supaya sama persis dengan canonical
      // yang dihasilkan `alternates.canonical` di layout.
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}
