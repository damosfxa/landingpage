

export function TrustBanner() {
  return (
    <div className="w-full border-b border-border bg-card py-10 overflow-hidden flex flex-col items-center">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
        Dibangun Menggunakan Teknologi Modern & Andal
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70 grayscale max-w-5xl px-4">
        {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Web3Forms", "SEO Optimized"].map((brand, i) => (
          <div key={i} className="text-xl md:text-2xl font-bold font-serif tracking-tight">
            {brand}
          </div>
        ))}
      </div>
    </div>
  )
}
