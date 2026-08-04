"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import type { Database } from "@/lib/types/database";
import { useSectionScroll } from "@/lib/use-section-scroll";

type Project = Database["public"]["Tables"]["projects"]["Row"];

/**
 * Contoh desain berhenti ditampilkan begitu proyek klien mencapai jumlah ini.
 *
 * Pemanggil WAJIB mengambil lebih banyak dari angka ini. Sebelumnya `page.tsx`
 * memakai `.limit(4)` sementara ambangnya 5, sehingga syaratnya mustahil
 * terpenuhi dan mockup tidak akan pernah hilang berapa pun jumlah proyek asli.
 */
export const MIN_CLIENT_PROJECTS = 5;

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
  const displayProjects =
    projects.length >= MIN_CLIENT_PROJECTS ? projects : [...mockupProjects, ...projects];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollToSection = useSectionScroll();
  const lenis = useLenis();

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function openProject(project: Project) {
    // Simpan pemicunya supaya fokus bisa dikembalikan persis ke kartu yang
    // diklik setelah modal ditutup, bukan lompat ke awal halaman.
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  // Kunci latar saat modal terbuka.
  //
  // Dua lapis, karena keduanya menutup celah yang berbeda:
  //  - `lenis.stop()` menahan wheel yang dibajak Lenis (mode smooth scroll).
  //  - `overflow: hidden` menahan scroll native, yang jadi satu-satunya jalur
  //    saat pengunjung memilih reduced motion dan penghalusan Lenis mati.
  useEffect(() => {
    if (!selectedProject) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [lenis, selectedProject]);

  // Kembalikan fokus ke kartu pemicu begitu modal tertutup.
  useEffect(() => {
    if (selectedProject) return;

    triggerRef.current?.focus();
    triggerRef.current = null;
  }, [selectedProject]);

  // Escape untuk menutup, plus focus trap supaya Tab tidak keluar ke konten
  // di belakang modal yang secara visual tidak terlihat.
  useEffect(() => {
    if (!selectedProject) return;

    const dialog = dialogRef.current;
    dialog?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeProject();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // `dialog` sendiri ikut dicek karena ia fokusabel lewat tabIndex={-1},
      // jadi Shift+Tab dari container harus dibungkus ke elemen terakhir.
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="portofolio"
      className="scroll-mt-24 bg-slate-50 py-24 lg:py-32 border-t border-b border-border"
    >
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
            <article
              key={project.id}
              className="group relative flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <div className="relative h-[200px] sm:h-[240px] w-full overflow-hidden bg-slate-200">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  {/* Tombolnya cuma membungkus judul, bukan seluruh kartu, supaya
                      <h3> tetap terbaca sebagai heading (isi <button> diratakan
                      di accessibility tree). `after:inset-0` merentangkan area
                      kliknya ke seluruh kartu, jadi perilaku mouse tidak berubah. */}
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      aria-haspopup="dialog"
                      className="text-left cursor-pointer after:absolute after:inset-0 after:content-[''] focus:outline-none"
                    >
                      {project.title}
                    </button>
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
            </article>
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
              onClick={closeProject}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              data-lenis-prevent="true"
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-10 focus:outline-none"
            >
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
              </div>

              <div className="p-6 sm:p-10 flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3">
                  {isMockup(selectedProject) ? "Konsep desain" : "Proyek klien"}
                </span>
                <h3 id="project-dialog-title" className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
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
                    onClick={(e) => {
                      // Jalur ini memindahkan pengunjung ke section lain, jadi
                      // fokus sengaja TIDAK dikembalikan ke kartu pemicu --
                      // kalau dikembalikan, browser menarik halaman balik ke
                      // kartu dan melawan scroll ke #kontak.
                      triggerRef.current = null;
                      closeProject();
                      // Efek cleanup yang memanggil `lenis.start()` baru jalan
                      // setelah render berikutnya, sedangkan `scrollTo` diabaikan
                      // selama Lenis ter-stop. Hidupkan dulu di sini.
                      lenis?.start();
                      scrollToSection(e, "#kontak");
                    }}
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
