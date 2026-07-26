import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.byvoxy.com"),
  title: {
    default: "Voxy Web Studio | Jasa Pembuatan Website Tour & Travel",
    template: "%s | Voxy Web Studio"
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
  authors: [{ name: "Voxy Web Studio" }],
  creator: "Voxy Web Studio",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.byvoxy.com",
    title: "Voxy Web Studio | Jasa Pembuatan Website Tour & Travel",
    description:
      "Website untuk biro tour & travel: desain kustom, cepat dibuka, dan siap ditemukan lewat pencarian Google.",
    siteName: "Voxy Web Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voxy Web Studio, jasa pembuatan website tour & travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxy Web Studio | Jasa Pembuatan Website Tour & Travel",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Voxy Web Studio",
  image: "https://www.byvoxy.com/og-image.jpg",
  description:
    "Jasa pembuatan website untuk biro tour & travel di Indonesia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  url: "https://www.byvoxy.com",
  telephone: "+6285111601910",
  priceRange: "Rp 1.500.000 - Rp 7.500.000",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
