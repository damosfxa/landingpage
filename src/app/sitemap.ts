import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti URL ini dengan domain asli Anda saat sudah live (contoh: https://voxy-travel-premium.com)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voxy-travel-premium.com'
  
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    }
    // Jika nanti Anda menambahkan halaman blog atau paket, Anda bisa menambahkannya di sini
    // {
    //   url: `${baseUrl}/paket-umrah`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // },
  ]
}
