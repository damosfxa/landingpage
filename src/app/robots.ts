import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.byvoxy.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Jika Anda memiliki halaman admin atau halaman yang belum selesai, Anda bisa memblokir Googlebot:
      // disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
