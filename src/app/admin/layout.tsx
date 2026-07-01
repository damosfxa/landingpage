"use client"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, LogOut, Image as ImageIcon } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="font-serif text-lg font-bold text-foreground">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1">
          <a
            href="/admin"
            className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>
          {/* Placeholder for future features */}
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <ImageIcon className="h-5 w-5" />
            Galeri / Portofolio
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
