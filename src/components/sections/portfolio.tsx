"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Database } from "@/lib/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export function PortfolioSection({ projects }: { projects: Project[] }) {
  // Mockup data (Fake Portfolio) jika database kosong
  const dummyProjects: Project[] = [
    {
      id: "dummy-1",
      title: "Al-Hijrah Premium Umrah",
      slug: "al-hijrah",
      description: "Desain antarmuka eksklusif untuk biro travel umrah bintang 5 dengan sistem booking yang terintegrasi penuh.",
      image_url: "/mockups/al-hijrah.jpg",
      tech_stack: ["Next.js", "Tailwind", "Supabase"],
      metrics: { "Peningkatan Konversi": "150%", "Kecepatan Muat": "0.8s" },
      created_at: new Date().toISOString(),
    },
    {
      id: "dummy-2",
      title: "ZamZam Tour Experience",
      slug: "zamzam-tour",
      description: "Platform pemesanan paket haji plus dengan tampilan Timur Tengah modern yang menanamkan kepercayaan tinggi.",
      image_url: "/mockups/zamzam.jpg",
      tech_stack: ["React", "Framer Motion", "PostgreSQL"],
      metrics: { "Skor SEO": "100/100", "Traffic Bulanan": "+45%" },
      created_at: new Date().toISOString(),
    }
  ];

  // Logika Cerdas: Tetap tampilkan dummy sampai ada minimal 5 proyek asli
  const displayProjects = projects.length >= 5 ? projects : [...dummyProjects, ...projects];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portofolio" className="bg-slate-50 py-24 lg:py-32 border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Karya Kami (Mockups)
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Bukti Kualitas <span className="italic text-primary">Standar Tinggi</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami tidak menjual janji kosong. Berikut adalah beberapa contoh standar desain antarmuka (<span className="italic font-semibold text-foreground">interface</span>) premium yang akan Anda dapatkan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
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
              </div>

              {/* Content */}
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

                {/* Metrics */}
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

      {/* Modal Detail Project */}
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
                  Website Showcase
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
                    Pesan Desain Serupa <ArrowUpRight className="w-4 h-4" />
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
