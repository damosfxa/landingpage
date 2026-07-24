import type { Metadata } from "next";
import Link from "next/link";

import { createProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";

export const metadata: Metadata = {
  title: "Tambah Project",
  robots: { index: false, follow: false },
};

import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <>
      <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tambah Project</h1>
          <p className="text-sm text-slate-400">Unggah karya terbaru Anda ke dalam portofolio</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/projects" 
            className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8" data-lenis-prevent="true">
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <ProjectForm action={createProject} submitLabel="Simpan Project" />
        </div>
      </div>
    </>
  );
}
