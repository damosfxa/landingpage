import type { NextConfig } from "next";

// Hostname diturunkan dari env, bukan di-hardcode, supaya project ref hanya
// hidup di satu tempat dan tidak ikut tersimpan di repo publik.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  images: {
    // Dikunci ke project dan bucket sendiri, bukan wildcard `*.supabase.co`.
    // Wildcard hostname tanpa `pathname` mengizinkan gambar dari project
    // Supabase SIAPA PUN dilewatkan optimizer `/_next/image` di sini --
    // penyerang bisa memaksa server memproses gambar besar berulang kali
    // (menghabiskan kuota image optimization) atas nama domain ini.
    //
    // Kalau env belum di-set, daftarnya kosong: semua gambar remote ditolak.
    // Itu default yang aman, bukan gagal terbuka.
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https" as const,
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/portfolio_images/**",
            search: "",
          },
        ]
      : [],
  },
  async redirects() {
    return [
      {
        source: "/layanan/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    // script-src/style-src pakai 'unsafe-inline' karena GA snippet, JSON-LD,
    // dan Framer Motion butuh inline script/style — proxy.ts sengaja hanya
    // jalan di /admin & /login (lihat docs/backend-setup.md) supaya halaman
    // publik tetap statis, jadi nonce per-request (yang butuh middleware di
    // semua rute) bukan opsi tanpa mengorbankan itu.
    // React dan Turbopack memakai eval() di mode development untuk source map
    // dan rekonstruksi callstack. Tanpa 'unsafe-eval' di dev, konsol dibanjiri
    // error dan fitur debug mati. Produksi TIDAK mendapat izin ini.
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
      "https://www.googletagmanager.com",
    ].join(" ");

    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.supabase.co https://www.googletagmanager.com https://*.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        // Login pakai password, jadi dicegah dibuka di iframe (clickjacking).
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // `interest-cohort` sengaja dihapus: FLoC sudah dibatalkan dan
            // direktifnya tidak lagi dikenali browser mana pun.
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
          },
          // Isolasi dari dokumen lintas-origin yang membuka situs ini lewat
          // window.open.
          //
          // Cross-Origin-Resource-Policy sengaja TIDAK dipasang: `og-image.jpg`
          // memang harus bisa diambil lintas-origin oleh crawler pratinjau
          // WhatsApp dan media sosial, dan itu justru kanal utama bisnis ini.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
