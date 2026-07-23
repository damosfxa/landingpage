# Design System & UI/UX Guidelines

## 1. Visi Desain
"Premium, Elegan, dan Dapat Dipercaya." 
Desain tidak boleh terlihat seperti *template* murah atau hasil *generate* AI generik (AI Slop). Setiap elemen harus memancarkan *Vibe* agensi elit.

## 2. Palet Warna (Tailwind Config)
- **Background Utama:** Slate gelap / Navy (`#0f172a` atau `bg-background`).
- **Warna Teks Utama:** Putih kontras tinggi (`text-foreground`).
- **Warna Aksen (Primary):** Biru elektrik (`#3b82f6` atau `text-primary`). Digunakan khusus untuk titik penekanan, CTA, dan elemen penting.
- **Warna Muted:** Abu-abu terang (`text-muted-foreground`) untuk teks pendukung agar hierarki visual terjaga.

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
