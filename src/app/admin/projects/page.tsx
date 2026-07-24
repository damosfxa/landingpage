import type { Metadata } from "next";
import Link from "next/link";

import { deleteProject } from "@/app/admin/actions";
import { createClient } from "@/utils/supabase/server";
import { FolderKanban, Plus, Image as ImageIcon, Trash2, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "Kelola Portofolio",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-white">Kelola Portofolio</h1>
          <p className="text-sm text-slate-400">Tambahkan atau hapus data proyek (<span className="italic text-slate-300">project</span>) Anda</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/projects/new" 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Tambah Project
          </Link>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8" data-lenis-prevent="true">
        {error ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6">
            Gagal memuat project: {error.message}
          </div>
        ) : null}

        {!projects?.length ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-2xl">
            <FolderKanban className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-slate-400 mb-4">Belum ada project di portofolio Anda.</p>
            <Link 
              href="/admin/projects/new" 
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Buat Project Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 text-slate-400 text-sm border-b border-slate-800">
                    <th className="p-5 font-medium">Judul Project</th>
                    <th className="p-5 font-medium">Slug</th>
                    <th className="p-5 font-medium">Tech Stack</th>
                    <th className="p-5 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5 text-sm text-white font-medium flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                          <ImageIcon className="w-5 h-5 text-slate-500" />
                        </div>
                        {project.title}
                      </td>
                      <td className="p-5 text-sm text-slate-400 font-mono">/{project.slug}</td>
                      <td className="p-5 text-sm">
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                          {project.tech_stack.length > 3 && (
                            <span className="px-2 py-1 bg-slate-800/50 text-slate-400 rounded text-xs">
                              +{project.tech_stack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5 text-right space-x-2">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/projects/${project.id}`} 
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <form action={deleteProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <button 
                              type="submit" 
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
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
