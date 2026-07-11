import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://byvoxy.com'

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
