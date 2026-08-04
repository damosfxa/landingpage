# System Architecture

## 1. Tech Stack Overview
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (untuk fleksibilitas maksimum)
- **Animations:** Framer Motion (micro-interactions) & Lenis (Smooth Scrolling)
- **Deployment:** Vercel (CI/CD otomatis dari GitHub `main` branch)
- **Icons:** Lucide React & Custom SVG (Voxy Logo di `src/app/icon.svg`)

- **Backend:** Supabase (Postgres + Auth + Storage), diakses lewat RLS
- **Testing:** Playwright + axe-core untuk regression aksesibilitas

## 2. Folder Structure
```text
/src
  /app           -> App Router (pages, layout, globals.css, icon.svg)
    /admin       -> Dashboard lead & portofolio (butuh login)
    /login       -> Halaman login admin
    /privasi     -> Kebijakan privasi
  /components
    /sections    -> Komponen modular per blok Landing Page (Hero, FAQ, Pricing, dll)
    ...          -> Komponen global (Navbar, TrustBanner, LeadForm)
  /lib           -> Konstanta, analytics, validasi, data statis
  /utils/supabase-> Client Supabase per konteks (server, proxy, public)
/docs            -> Dokumentasi Proyek Standar (PRD, Architecture, Rules)
/public          -> Aset statis (og-image, mockup portofolio)
/supabase        -> Migrasi SQL (skema + RLS)
/tests           -> Regression aksesibilitas (Playwright + axe)
```

## 3. Data Flow & State Management
Rendering dipisah sesuai kebutuhan tiap rute:

| Rute | Mode | Alasan |
|---|---|---|
| `/`, `/privasi` | **Statis + ISR** (`revalidate = 3600`) | Halaman publik harus cepat dan bisa di-cache CDN |
| `/admin/*`, `/login` | **Dinamis** | Butuh sesi user, jadi wajib dirender per request |

Homepage tetap statis meski membaca `projects` dari Supabase, karena memakai
`createPublicClient()` (`src/utils/supabase/public.ts`) yang **tidak** menyentuh
`cookies()`. Memanggil `cookies()` di Server Component akan memaksa seluruh rute
jadi dinamis -- itu pernah terjadi dan membuat homepage kehilangan status statis
tanpa disadari.

- **Tidak ada Redux/Zustand** karena *state* hanya terbatas pada UI level (seperti `isOpen` pada Mobile Menu atau *accordion* FAQ), cukup menggunakan React `useState`.

## 4. Technical Decisions
- **Mengapa Next.js?** Karena Voxy menargetkan audiens B2B yang peduli pada kredibilitas dan performa. Next.js memberikan SEO (*Programmatic SEO*) yang jauh lebih superior dibanding *Single Page Application* (React murni) atau WordPress.
- **Mengapa Vercel?** Skalabilitas nol-konfigurasi dan integrasi DNS/SSL otomatis (domain `byvoxy.com`).
