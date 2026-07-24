"use client";

import { useActionState } from "react";
import { Save, AlertCircle, ImageIcon } from "lucide-react";
import type { Project } from "@/lib/types/database";
import { initialAdminFormState, type AdminFormState } from "@/lib/types/form-state";

type ProjectFormProps = {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  project?: Project;
  submitLabel: string;
};

export function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} className="space-y-6">
      {project?.image_url ? (
        <input type="hidden" name="current_image_url" value={project.image_url} />
      ) : null}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-300">Judul Project</label>
        <input 
          id="title" 
          name="title" 
          type="text" 
          required 
          defaultValue={project?.title} 
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Contoh: Al-Hijrah Premium Umrah"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium text-slate-300">URL Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          defaultValue={project?.slug}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm"
          placeholder="contoh: al-hijrah-premium"
        />
        <p className="text-xs text-slate-500">Hanya huruf kecil, angka, dan tanda hubung (-)</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-300">Deskripsi Singkat</label>
        <textarea 
          id="description" 
          name="description" 
          required 
          defaultValue={project?.description}
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          placeholder="Jelaskan secara singkat tentang proyek ini..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tech_stack" className="text-sm font-medium text-slate-300">Teknologi / Fitur Utama</label>
        <input
          id="tech_stack"
          name="tech_stack"
          type="text"
          defaultValue={project?.tech_stack?.join(", ")}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Contoh: Next.js, Tailwind, Sistem Booking Otomatis (pisahkan dengan koma)"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="metrics" className="text-sm font-medium text-slate-300">Pencapaian / Metrik (Opsional)</label>
        <textarea
          id="metrics"
          name="metrics"
          rows={2}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          placeholder='{"Peningkatan Konversi": "150%", "Kecepatan Muat": "0.8s"}'
          defaultValue={project?.metrics ? JSON.stringify(project.metrics) : ""}
        />
        <p className="text-xs text-slate-500">Format JSON Valid. Digunakan untuk menampilkan angka pencapaian.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium text-slate-300">Gambar Cover</label>
        <div className="relative">
          <input 
            id="image" 
            name="image" 
            type="file" 
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </span>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {submitLabel}
            </>
          )}
        </button>
      </div>

      {state.status === "error" ? (
        <div role="alert" className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm text-red-400">
            <p className="font-semibold">{state.message}</p>
            {state.fieldErrors
              ? Object.entries(state.fieldErrors).map(([field, errors]) => (
                  <p key={field} className="mt-1">
                    <span className="capitalize">{field}</span>: {errors.join(", ")}
                  </p>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
