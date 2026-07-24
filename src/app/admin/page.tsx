import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/login/actions";
import type { Lead } from "@/lib/types/database";
import { createClient } from "@/utils/supabase/server";
import { deleteLead } from "./actions";
import { LayoutDashboard, FolderKanban, Users, LogOut, Search, MoreVertical, Trash2, CheckCircle2, MessageCircle } from "lucide-react";
import { StatusSelect } from "./status-select";

export const metadata: Metadata = {
  title: "Dashboard Admin | Voxy Web Studio",
  robots: { index: false, follow: false },
};

const STATUSES: Lead["status"][] = ["NEW", "CONTACTED", "CLOSED"];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-white">Leads Masuk</h1>
            <p className="text-sm text-slate-400">Kelola prospek klien dari Landing Page</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total: {leads?.length ?? 0}
            </div>
            {/* Mobile Menu Button - Optional for now */}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8" data-lenis-prevent="true">
          {error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6">
              Gagal memuat leads: {error.message}
            </div>
          ) : null}

          {!leads?.length ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-2xl">
              <Users className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400">Belum ada lead masuk dari form web.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/50 text-slate-400 text-sm border-b border-slate-800">
                      <th className="p-5 font-medium">Tanggal Masuk</th>
                      <th className="p-5 font-medium">Prospek</th>
                      <th className="p-5 font-medium">No. WhatsApp</th>
                      <th className="p-5 font-medium">Biro Travel</th>
                      <th className="p-5 font-medium">Status</th>
                      <th className="p-5 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="p-5 text-sm text-slate-400 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleString("id-ID", {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="p-5">
                          <p className="font-semibold text-slate-200">{lead.name}</p>
                        </td>
                        <td className="p-5 font-mono text-sm text-slate-300">
                          <div className="flex items-center gap-3">
                            <span>{lead.phone}</span>
                            <a 
                              href={`https://wa.me/${lead.phone.startsWith('0') ? '62' + lead.phone.slice(1) : lead.phone}?text=${encodeURIComponent(`Halo Pak/Bu ${lead.name}, saya Rizky dari Voxy.dev. Saya menerima permintaan konsultasi pembuatan website travel Anda. Boleh kita jadwalkan waktu untuk diskusi lebih detail?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 p-1.5 rounded-md transition-colors"
                              title="Chat WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          </div>
                        </td>
                        <td className="p-5 text-slate-400">{lead.agency_name || <span className="text-slate-600 italic">Tidak diisi</span>}</td>
                        <td className="p-5">
                          <StatusSelect id={lead.id} currentStatus={lead.status} />
                        </td>
                        <td className="p-5 text-right">
                          <form action={deleteLead}>
                            <input type="hidden" name="id" value={lead.id} />
                            <button type="submit" className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    </>
  );
}
