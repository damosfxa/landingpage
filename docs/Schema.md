# Database Schema (Future Proofing)

*Catatan: Saat ini proyek Voxy Web Studio berstatus Landing Page Statis (Tanpa DB).*
*Dokumen ini adalah cetak biru (Blueprint) jika kelak sistem diubah menjadi Fullstack (Supabase).*

## 1. Tabel: `Leads`
Tujuan: Menyimpan data calon klien yang mengisi form selain WhatsApp.
- `id` (UUID, Primary Key)
- `name` (String, Not Null)
- `phone_number` (String, Not Null) - *WA Number*
- `agency_name` (String, Nullable)
- `status` (Enum: `NEW`, `CONTACTED`, `NEGOTIATION`, `CLOSED`, `LOST`) - *Default: NEW*
- `created_at` (Timestamp, Default Now)

## 2. Tabel: `Travel_Packages` (Untuk Demo Klien)
Tujuan: Jika web ini digunakan sebagai *template* untuk klien biro travel.
- `id` (UUID, Primary Key)
- `package_name` (String, Not Null) - *Contoh: Umroh Reguler 9 Hari*
- `price` (Decimal, Not Null)
- `departure_date` (Date, Not Null)
- `hotel_makkah` (String, Not Null)
- `hotel_madinah` (String, Not Null)
- `availability` (Integer, Default 45) - *Sisa seat*
- `image_url` (String, Nullable)

## 3. Migration Rules
- **Jangan pernah menggunakan `DROP TABLE`** di *production* tanpa *backup*.
- Penambahan kolom baru harus memiliki nilai *default* atau *nullable* agar tidak merusak data lama.
