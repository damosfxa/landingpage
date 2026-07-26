"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Database } from "@/lib/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];

// Contoh desain buatan sendiri, dipakai selama portofolio klien belum cukup banyak.
const mockupProjects: Project[] = [
  {
    id: "mockup-1",
    title: "Al-Hijrah Premium Umrah",
    slug: "al-hijrah",
    description:
      "Konsep tampilan untuk biro umrah: daftar paket, jadwal keberangkatan, dan halaman legalitas dalam satu alur baca.",
    image_url: "/mockups/al-hijrah.jpg",
    tech_stack: ["Next.js", "Tailwind", "Supabase"],
    metrics: {},
    created_at: new Date().toISOString(),
  },
  {
    id: "mockup-2",
    title: "ZamZam Tour Experience",
    slug: "zamzam-tour",
    description:
      "Konsep tampilan untuk paket tur rombongan, dengan galeri dokumentasi perjalanan dan formulir pendaftaran per keberangkatan.",
    image_url: "/mockups/zamzam.jpg",
    tech_stack: ["React", "Framer Motion", "PostgreSQL"],
    metrics: {},
    created_at: new Date().toISOString(),
  },
];

const isMockup = (project: Project) => project.id.startsWith("mockup-");

export function PortfolioSection({ projects }: { projects: Project[] }) {
  // Contoh desain tetap ditampilkan sampai ada minimal 5 proyek klien.
  const displayProjects = projects.length >= 5 ? projects : [...mockupProjects, ...projects];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portofolio" className="bg-slate-50 py-24 lg:py-32 border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Portofolio
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Contoh tampilan yang kami buat
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sebagian di antaranya masih berupa konsep desain buatan sendiri, dan kami tandai
            supaya jelas mana yang sudah berjalan sebagai proyek klien.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-[200px] sm:h-[240px] w-full overflow-hidden bg-slate-200">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium text-sm">
                    Tidak ada gambar
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {isMockup(project) && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Konsep desain
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center bg-background shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-1 text-sm">
                  {project.description}
                </p>

                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border mt-auto">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xs text-muted-foreground mb-1">{key}</div>
                        <div className="font-serif text-lg font-bold text-foreground">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Tutup detail proyek"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[30vh] sm:h-[40vh] bg-slate-900 overflow-hidden shrink-0">
                {selectedProject.image_url && (
                  <Image
                    src={selectedProject.image_url}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
              </div>

              <div className="p-6 sm:p-10 flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3">
                  {isMockup(selectedProject) ? "Konsep desain" : "Proyek klien"}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
                  {selectedProject.title}
                </h3>

                <div className="prose prose-invert max-w-none mb-10">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.metrics && Object.keys(selectedProject.metrics).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 bg-white/5 rounded-xl p-6 border border-white/5">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-sm text-slate-400 mb-2">{key}</div>
                        <div className="font-serif text-2xl font-bold text-white">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="#kontak"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-8 py-3 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Diskusikan Desain Serupa <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
