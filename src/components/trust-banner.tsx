const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"]

export function TrustBanner() {
  return (
    <div className="border-b border-border bg-secondary py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:gap-8">
        <p className="shrink-0 text-sm text-muted-foreground">Dibangun dengan</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {stack.map((name) => (
            <li key={name} className="text-sm font-medium text-foreground">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
