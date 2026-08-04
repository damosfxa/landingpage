# Membersihkan histori repo (K3 & K4)

Dokumen ini **belum dijalankan**. Semua perintah di bawah harus Anda eksekusi
sendiri, karena rewrite histori mengubah semua commit hash dan butuh force-push
ke repo publik `github.com/damosfxa/landingpage`.

## Apa yang perlu dibersihkan

| Kode | Path | Kenapa |
|---|---|---|
| K3 | `tools/maps-scraper/leads-voxy-seo-master.csv` | 36 biro umroh nyata: nama bisnis, nomor telepon, link Maps. Data pihak ketiga, dikumpulkan otomatis dari Google Maps, dipublikasikan tanpa dasar hukum pemrosesan (UU PDP No. 27/2022). |
| K3 | `tools/maps-scraper/leads.html` | Versi ter-render dari data yang sama. |
| K4 | `tools/maps-scraper/node_modules/` | 4.480 file (97% dari seluruh file yang dilacak git). Tidak pernah dipindai Dependabot karena `dependabot.yml` hanya melihat `/`. |

`.gitignore` sudah diperbarui supaya ketiganya tidak masuk lagi ke depannya.
Yang belum: menghapusnya dari histori commit yang sudah terlanjur publik.

## Kenapa `git rm` saja tidak cukup

`git rm --cached` hanya menghapus file dari commit **berikutnya**. Seluruh commit
lama tetap ada di GitHub dan tetap bisa diakses siapa saja lewat URL commit
langsung — termasuk oleh mesin pencari dan oleh layanan yang mengarsipkan repo
publik. Untuk K3 (data pihak ketiga) itu berarti paparannya belum tertutup.

## Langkah

### 0. Backup dulu

```bash
git clone --mirror https://github.com/damosfxa/landingpage.git ../landingpage-backup.git
```

Simpan sampai Anda yakin hasil rewrite-nya benar. Ini satu-satunya jalan pulang
kalau ada yang salah.

### 1. Commit dulu pekerjaan yang sedang berjalan

Rewrite butuh working tree bersih.

```bash
git status --short
```

### 2. Pasang git-filter-repo

```bash
pip install git-filter-repo
```

### 3. Hapus ketiganya dari seluruh histori

```bash
git filter-repo --invert-paths --path tools/maps-scraper/node_modules/ --path tools/maps-scraper/leads-voxy-seo-master.csv --path tools/maps-scraper/leads.html --force
```

### 4. Periksa hasilnya sebelum push

```bash
git log --oneline -5
```

```bash
git ls-files | wc -l
```

Angkanya harus turun dari 4.581 ke sekitar 100. Kalau masih ribuan, rewrite-nya
tidak kena — jangan lanjut push, periksa dulu path-nya.

```bash
git log --all --diff-filter=D --name-only -- tools/maps-scraper/leads-voxy-seo-master.csv
```

Output kosong artinya file itu benar-benar hilang dari histori.

### 5. Pasang ulang remote dan force-push

`filter-repo` sengaja menghapus remote sebagai pengaman.

```bash
git remote add origin https://github.com/damosfxa/landingpage.git
```

```bash
git push origin --force --all
```

```bash
git push origin --force --tags
```

## Setelah push

- **Fork dan cache GitHub.** Rewrite tidak menyentuh fork orang lain, dan GitHub menyimpan objek commit lama beberapa waktu. Kalau repo ini pernah di-fork, hubungi GitHub Support untuk menghapus objek yang tertinggal.
- **Anggap datanya sudah tersebar.** CSV itu publik selama beberapa minggu. Untuk 36 biro yang terdaftar, kewajiban Anda tidak hilang hanya karena filenya dihapus.
- **Pertimbangkan memindahkan `tools/maps-scraper/` ke repo privat.** Tool ini tidak ada hubungannya dengan landing page, dan menyimpannya di repo publik mengundang masalah yang sama terulang.
- **Vercel akan build ulang** karena semua hash berubah. Wajar, tidak perlu tindakan.

## Kalau memilih tidak me-rewrite

Minimal jalankan ini supaya file berhenti ikut ke commit baru:

```bash
git rm -r --cached tools/maps-scraper/node_modules tools/maps-scraper/leads-voxy-seo-master.csv tools/maps-scraper/leads.html
```

Ini memperbaiki K4 secara praktis (ukuran repo ke depan), tapi **tidak**
menyelesaikan K3 — data kontaknya tetap bisa diambil dari histori.
