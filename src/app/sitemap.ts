import { MetadataRoute } from 'next'
import { targetCities, targetNiches } from '@/lib/data/seo-data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Di-hardcode agar tidak ikut berubah mengikuti env Vercel.
  const baseUrl = 'https://www.byvoxy.com'

  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    }
  ]

  // Halaman /layanan/[niche]/[kota]
  const dynamicPaths: MetadataRoute.Sitemap = []
  
  targetNiches.forEach(niche => {
    targetCities.forEach(kota => {
      dynamicPaths.push({
        url: `${baseUrl}/layanan/${niche.slug}/${kota.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })
  
  return [...staticPaths, ...dynamicPaths]
}
