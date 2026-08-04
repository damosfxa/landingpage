import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { BRAND_NAME, SITE_URL, WA_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Jasa Pembuatan Website Tour & Travel`,
    template: `%s | ${BRAND_NAME}`
  },
  description:
    "Jasa pembuatan website untuk biro tour & travel: desain kustom, halaman yang cepat dibuka, dan struktur SEO yang tertata. Domain dan hosting tahun pertama sudah termasuk.",
  keywords: [
    "jasa pembuatan website travel",
    "website tour and travel",
    "jasa website biro perjalanan wisata",
    "jasa landing page travel",
    "pembuatan website umroh",
    "jasa seo website travel",
    "voxy web studio",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: `${BRAND_NAME} | Jasa Pembuatan Website Tour & Travel`,
    description:
      "Website untuk biro tour & travel: desain kustom, cepat dibuka, dan siap ditemukan lewat pencarian Google.",
    siteName: BRAND_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME}, jasa pembuatan website tour & travel`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Jasa Pembuatan Website Tour & Travel`,
    description:
      "Website untuk biro tour & travel: desain kustom, cepat dibuka, dan siap ditemukan lewat pencarian Google.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "SZeNGmYwWO5A6K9vKlWSAXwKT3rLXgg1VXj8tGWdLEY",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

// "Organization", bukan "ProfessionalService" (subtipe LocalBusiness): bisnis
// ini beroperasi jarak jauh tanpa kantor walk-in (lihat footer), jadi tidak
// punya alamat jalan lengkap yang disyaratkan Google untuk LocalBusiness yang
// valid. Detail harga per paket ada di JSON-LD Service/Offer, lihat pricing.tsx.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Jasa pembuatan website untuk biro tour & travel di Indonesia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  url: SITE_URL,
  telephone: `+${WA_NUMBER}`,
  areaServed: "Indonesia",
  knowsAbout: ["Website Tour & Travel", "Web Development", "SEO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className={`min-h-full flex flex-col font-sans ${inter.variable} ${jakartaSans.variable}`}>
        {/* Google Analytics aktif hanya bila NEXT_PUBLIC_GA_ID di-set. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <script
          type="application/ld+json"
          // Escape `<` per rekomendasi resmi Next.js: JSON.stringify tidak
          // sanitasi string, dan tanpa ini JSON-LD bisa keluar dari konteks
          // <script> kalau kontennya nanti memuat "</script>".
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Navbar fixed selalu jadi stop Tab pertama di setiap kunjungan, jadi
            pengguna keyboard butuh jalan pintas melewatinya. Tersembunyi sampai
            difokus. */}
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:font-semibold"
        >
          Lewati ke konten utama
        </a>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
