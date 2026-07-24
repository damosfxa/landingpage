import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Edit Project",
  robots: { index: false, follow: false },
};

import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  return (
    <>
      <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-white">Edit Project</h1>
          <p className="text-sm text-slate-400">Perbarui informasi portofolio Anda</p>
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
          <ProjectForm
            action={updateProject.bind(null, project.id)}
            project={project}
            submitLabel="Perbarui Project"
          />
        </div>
      </div>
    </>
  );
}
