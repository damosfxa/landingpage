import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/login/actions";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Admin | Voxy Web Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex" data-lenis-prevent="true">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Voxy Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard Leads
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl font-medium transition-colors">
            <FolderKanban className="h-5 w-5" />
            Kelola Portofolio
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl font-medium transition-colors">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
