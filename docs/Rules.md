# Coding Rules & Constraints (AI & Human)

Dokumen ini adalah **HUKUM MUTLAK** bagi semua kontributor (termasuk Agen AI) yang memodifikasi *codebase* ini. Pelanggaran terhadap *rules* ini akan menyebabkan penolakan *Pull Request* / *Commit*.

## 1. Anti-Vibe Code Directive
- **Dilarang keras** menggunakan "AI Slop" atau bahasa copywriting murahan buatan AI generik (misal: "Solusi komprehensif terdepan untuk merevolusi era digital Anda"). Gunakan bahasa *copywriting* yang *edgy*, brutal jujur, dan langsung menyerang *pain points* (bahasa *Sales*).
- **Dilarang keras** menaruh logika bisnis (*business logic*) di dalam komponen presentasi (UI). Ekstrak ke *custom hooks* atau fungsi utilitas.

## 2. Vanilla JS Security (Jika ada integrasi non-React)
- **NO GLOBAL SINGLETONS**: Jangan pernah menggunakan `<script src="...">` yang mengotori *window*. Selalu gunakan ES6 Modules.
- **BULLETPROOF XSS**: Dilarang menggunakan Regex untuk membersihkan tag `<` atau `>`. Selalu gunakan utilitas sanitasi resmi (atau biarkan React mendari XSS via DOM binding).

## 3. Styling Rules (Tailwind)
- **Grid Overflow Prevention**: Saat menggunakan CSS Grid `auto-fit`, DILARANG *hardcode* `minmax(250px, 1fr)`. Selalu gunakan `minmax(min(100%, 250px), 1fr)` untuk mencegah tampilan hancur/tumpah di layar HP sekecil iPhone SE.
- **Konsistensi UI**: Gunakan palet warna yang sudah dideklarasikan di `tailwind.config.ts`. Dilarang mencampur kode hex acak di tengah kode (misal: `bg-[#ff0000]`), gunakan token desain seperti `bg-destructive`.

## 4. Component Structure
- Buat komponen sekecil mungkin (*Modular*). Jika sebuah *file* melebihi 250 baris kode, itu pertanda bahwa komponen tersebut harus dipecah menjadi sub-komponen.
- Semua *file* komponen harus menggunakan `PascalCase` untuk nama *function* dan `kebab-case` untuk nama *file* (contoh: `trust-banner.tsx`).

## 5. Deployment Audit (Rubric Optimization)
Sebelum melakukan `git push` ke branch `main`, kontributor WAJIB melakukan audit mandiri:
1. Apakah struktur A11y (Heading) melompat?
2. Apakah ada *memory leak* di animasi Framer Motion?
3. Apakah performa build Next.js (SSG) berjalan tanpa *error*? (`npm run build`)
Hanya eksekusi *push* JIKA SEMUA telah lulus uji.
