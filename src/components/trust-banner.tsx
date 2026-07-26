const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"]

export function TrustBanner() {
  return (
    <div className="w-full border-b border-border bg-card py-10 overflow-hidden flex flex-col items-center">
      <p className="text-sm font-medium text-muted-foreground mb-8">
        Dibangun dengan
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 max-w-5xl px-4">
        {stack.map((name) => (
          <div key={name} className="text-xl md:text-2xl font-bold font-serif tracking-tight">
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
