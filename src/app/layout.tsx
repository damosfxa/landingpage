import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Voxy Web Studio | Jasa Pembuatan Website Travel Premium & Profesional",
    template: "%s | Voxy Web Studio"
  },
  description: "Tingkatkan kredibilitas dan omzet bisnis travel umrah/wisata Anda dengan desain website eksklusif, cepat, dan siap mendominasi pencarian Google.",
  keywords: [
    // Niche Travel & Umroh
    "jasa website travel", "pembuatan web umroh", "developer web wisata", "website tour and travel", "jasa landing page travel", 
    "desain web premium", "voxy web studio", "jasa website haji plus", "bikin web biro travel", "jasa seo website travel",
    "pembuatan web islamic tour", "jasa web halal tourism", "pembuatan company profile perusahaan", "jasa web biro perjalanan wisata",
    // Top Region Target (Berdasarkan Data Sebaran PPIU Terbesar di Indonesia)
    "web developer bekasi", "jasa website travel jakarta", "pembuatan web umroh jawa barat", "jasa web travel bandung", 
    "jasa website travel makassar", "developer web umroh surabaya", "pembuatan web umroh jawa timur", "jasa website travel jabodetabek",
    "jasa web travel semarang", "pembuatan web umroh banten", "jasa website travel jawa tengah", "developer web travel sulawesi selatan"
  ],
  authors: [{ name: "Voxy Web Studio" }],
  creator: "Voxy Web Studio",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://byvoxy.com",
    title: "Voxy Web Studio | Jasa Pembuatan Website Travel Premium",
    description: "Tingkatkan kredibilitas bisnis travel Anda dengan website eksklusif, cepat, dan 100% responsif.",
    siteName: "Voxy Web Studio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop", // Placeholder OG Image
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Website Travel Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website Travel Premium",
    description: "Tingkatkan kredibilitas bisnis travel Anda dengan website eksklusif, cepat, dan 100% responsif.",
    images: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"],
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

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap" 
});

const playfair = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-playfair", 
  display: "swap" 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className={`min-h-full flex flex-col font-sans ${inter.variable} ${playfair.variable}`}>
        {/* Suntikan JSON-LD Schema (KTP Digital Voxy untuk Google & AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Voxy Web Studio",
              "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
              "description": "Jasa Pembuatan Website Travel Premium & Profesional, spesialis B2B Biro Umroh dan Haji.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta",
                "addressCountry": "ID"
              },
              "url": "https://byvoxy.com",
              "telephone": "+6285111601910",
              "priceRange": "$$$",
              "areaServed": "Indonesia",
              "knowsAbout": ["Website Travel", "SEO Umroh", "Web Development", "B2B Marketing"]
            })
          }}
        />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
