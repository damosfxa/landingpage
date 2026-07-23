# System Architecture

## 1. Tech Stack Overview
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (untuk fleksibilitas maksimum)
- **Animations:** Framer Motion (micro-interactions) & Lenis (Smooth Scrolling)
- **Deployment:** Vercel (CI/CD otomatis dari GitHub `main` branch)
- **Icons:** Lucide React & Custom SVG (Voxy Logo di `src/app/icon.svg`)

## 2. Folder Structure (Monolith Frontend)
```text
/src
  /app           -> App Router (pages, layout, globals.css, icon.svg)
  /components
    /sections    -> Komponen modular per blok Landing Page (Hero, FAQ, Pricing, dll)
    ...          -> Komponen global (Navbar, Footer, TrustBanner)
/docs            -> Dokumentasi Proyek Standar (PRD, Architecture, Rules)
/public          -> Aset statis (Gambar OG, Icon fallback)
```

## 3. Data Flow & State Management
Karena ini adalah MVP (Landing Page murni), kita sepenuhnya mengandalkan **Static Site Generation (SSG)**.
- **Tidak ada Server-Side Rendering (SSR)** yang dinamis saat ini untuk menghemat *cost* server dan memaksimalkan kecepatan halaman.
- **Tidak ada Redux/Zustand** karena *state* hanya terbatas pada UI level (seperti `isOpen` pada Mobile Menu atau *accordion* FAQ), cukup menggunakan React `useState`.

## 4. Technical Decisions
- **Mengapa Next.js?** Karena Voxy menargetkan audiens B2B yang peduli pada kredibilitas dan performa. Next.js memberikan SEO (*Programmatic SEO*) yang jauh lebih superior dibanding *Single Page Application* (React murni) atau WordPress.
- **Mengapa Vercel?** Skalabilitas nol-konfigurasi dan integrasi DNS/SSL otomatis (domain `byvoxy.com`).
