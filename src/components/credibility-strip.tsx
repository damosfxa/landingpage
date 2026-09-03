const claims = [
  "Spesialis khusus travel & tour",
  "Bicara langsung dengan yang mengerjakan",
  "Balasan di hari yang sama",
]

/**
 * Menggantikan trust banner lama yang memajang tech stack (Next.js, Supabase,
 * dst) -- itu tidak berarti apa-apa buat pemilik biro travel. Klaim di sini
 * sengaja hal yang bisa langsung dibuktikan oleh studio baru tanpa histori
 * klien panjang, bukan social proof yang belum ada.
 *
 * Tanpa ikon dengan sengaja: badge "verified/headset/lightning" adalah pola
 * paling gampang dikenali sebagai template AI-generated. Teks murni dengan
 * pemisah tipografis lebih jujur dan lebih editorial.
 */
export function CredibilityStrip() {
  return (
    <div className="relative z-20 -mt-10 px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center divide-y divide-border rounded-lg border border-border bg-card py-2 px-8 shadow-sm md:flex-row md:divide-x md:divide-y-0">
        {claims.map((text, i) => (
          <div key={i} className="w-full px-6 py-4 text-center font-medium text-foreground md:w-auto md:flex-1">
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
