# Product Requirements Document (PRD)
**Project Name**: Voxy Web Studio Landing Page
**Target Audience**: B2B (Pemilik Biro Travel & Umroh)
**Primary Goal**: Lead Generation (Mendapatkan kontak WhatsApp calon klien)

## 1. Scope Project & MVP (Minimum Viable Product)
Fokus MVP saat ini adalah halaman statis profil bisnis (Landing Page) yang sangat teroptimasi untuk konversi B2B.
- **TIDAK ADA** sistem login/register untuk klien.
- **TIDAK ADA** integrasi payment gateway.
- Semua form konversi akan diarahkan langsung ke WhatsApp.

## 2. Fitur Utama (Core Features)
- **Hero Section**: Headline yang menyerang pain point (brosur kuno vs web modern) dengan Call-to-Action (CTA) langsung.
- **Portfolio/Tech Advantage**: Demonstrasi mengapa web Voxy lebih baik (Fast Loading, SEO, Anti-Hack).
- **Pricing Catalog**: Tabel harga transparan (Essential, Professional, Enterprise).
- **Floating WhatsApp**: Tombol WA yang selalu menempel di pojok layar.
- **FAQ Section**: Menjawab keraguan umum klien travel.

## 3. Technical Requirements
- Harus bisa dimuat (load) di bawah 2 detik (Fokus pada Next.js Static Site Generation).
- Harus 100% responsif di layar HP (karena 80% bos travel buka dari HP).
- SEO Technical: Wajib memiliki Schema Markup JSON-LD (tipe `ProfessionalService`).

## 4. Success Metrics
- **CPL (Cost Per Lead)**: Biaya akuisisi klien di bawah standar industri B2B jika menggunakan Ads.
- **Lighthouse Score**: Minimal 90 untuk Performance, Accessibility, Best Practices, dan SEO.
- **Anti-Pattern Free**: Lulus scan Impeccable (0 UI/UX Anti-Patterns).
