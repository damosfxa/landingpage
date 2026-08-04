# Design System & UI/UX Guidelines

## 1. Visi Desain
"Premium, Elegan, dan Dapat Dipercaya." 
Desain tidak boleh terlihat seperti *template* murah atau hasil *generate* AI generik (AI Slop). Setiap elemen harus memancarkan *Vibe* agensi elit.

## 2. Palet Warna
Token didefinisikan di `src/app/globals.css` lewat `@theme` (Tailwind v4 --
**tidak ada `tailwind.config.ts`** di proyek ini). Kalau dokumen ini berbeda
dengan `globals.css`, file CSS yang benar.

Landing page publik memakai **tema terang**:
- **Background Utama:** Putih (`#FFFFFF`, `bg-background`).
- **Warna Teks Utama:** Hampir hitam (`#09090B`, `text-foreground`) -- kontras tinggi.
- **Warna Aksen (Primary):** Biru (`#0044CC`, `text-primary`). 7,8:1 di atas putih, lolos WCAG AAA. Khusus untuk CTA dan titik penekanan.
- **Warna Muted:** `#3F3F46` (`text-muted-foreground`), 10,4:1 -- untuk teks pendukung.

Area `/admin` dan `/login` memakai skala `slate` gelap, sengaja dibedakan dari
halaman publik. Untuk teks pendukung di atas latar gelap, pakai `slate-400` ke
atas: `slate-500` dan `slate-600` gagal kontras AA.

## 3. Tipografi
Kita menggunakan kombinasi dua *font* Google untuk menjaga dinamika desain:
- **Heading / Judul (Font Utama):** `Plus Jakarta Sans` (memberikan kesan tegas dan profesional).
- **Body Text (Font Paragraf):** `Inter` (bersih, mudah dibaca di layar HP maupun desktop).
- *Catatan A11y:* Jangan pernah mencampur H2 dan H3 secara sembarangan. Gunakan urutan yang benar (H1 -> H2 -> H3).

## 4. UI/UX Anti-Patterns (Impeccable Checked)
Semua kontributor UI **dilarang keras** melakukan kesalahan berikut:
- **Oversized Headings:** Jangan membuat teks `H1` atau `H2` yang mendominasi lebih dari 40% layar tanpa ruang bernapas (White space).
- **Nested Cards:** Jangan meletakkan *card* di dalam *card* (kotak di dalam kotak) yang membuat desain terlihat berantakan (*cluttered*).
- **Repeated Kicker Labels:** Gunakan `<span>` dengan format blok, BUKAN `<p>`, untuk teks kecil di atas judul *section*, agar mesin aksesibilitas tidak mengira itu paragraf berulang.

## 5. Animasi (Framer Motion)
- Gunakan `initial={{ opacity: 0, y: 20 }}` dan `whileInView={{ opacity: 1, y: 0 }}` untuk efek muncul yang elegan.
- Hindari animasi berlebihan (jangan gunakan *bouncing* atau rotasi aneh). Fokus pada pergerakan halus (ease-out).
