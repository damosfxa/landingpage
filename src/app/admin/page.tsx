export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Selamat datang di Panel Admin.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats placeholder */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Proyek</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Pesan Masuk</h3>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h3 className="font-serif text-xl font-bold text-foreground">Integrasi CMS</h3>
        <p className="mt-2 text-muted-foreground">
          Modul pengelolaan konten dinamis (galeri, artikel, layanan) dapat ditambahkan di sini menggunakan Supabase Database.
        </p>
      </div>
    </div>
  )
}
