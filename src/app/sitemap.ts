import { MetadataRoute } from 'next'
import { targetCities, targetNiches } from '@/lib/data/seo-data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Hardcode Base URL resmi Voxy Web Studio agar tidak bentrok dengan Env Vercel
  const baseUrl = 'https://www.byvoxy.com'
  
  // Halaman Utama
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    }
  ]

  // Ratusan Halaman Programmatic SEO (Dinamis)
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
