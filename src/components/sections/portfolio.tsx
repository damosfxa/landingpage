"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
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
    <section id="portofolio" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Contoh tampilan yang kami buat
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Sebagian di antaranya masih berupa konsep desain buatan sendiri, dan kami tandai
            supaya jelas mana yang sudah berjalan sebagai proyek klien.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group flex h-full w-full flex-col border border-border bg-card text-left transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border bg-secondary">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                      Tidak ada gambar
                    </span>
                  )}
                  {isMockup(project) && (
                    <span className="absolute left-3 top-3 bg-surface-dark px-2 py-1 text-xs font-medium text-surface-dark-foreground rounded-sm">
                      Konsep desain
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.metrics && Object.keys(project.metrics).length > 0 && (
                    <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs text-muted-foreground">{key}</dt>
                          <dd className="font-serif text-lg font-semibold text-foreground">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Tutup detail proyek"
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 cursor-default bg-surface-dark/80"
          />

          <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto border border-surface-dark-border bg-surface-dark">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-20 border border-surface-dark-border bg-surface-dark p-2 text-surface-dark-foreground transition-colors hover:bg-surface-dark-border rounded-md"
              aria-label="Tutup detail proyek"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {selectedProject.image_url && (
              <div className="relative h-[30vh] w-full shrink-0 border-b border-surface-dark-border sm:h-[38vh]">
                <Image
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col p-6 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-wide text-surface-dark-muted">
                {isMockup(selectedProject) ? "Konsep desain" : "Proyek klien"}
              </span>
              <h3 className="mt-2 font-serif text-3xl font-semibold text-surface-dark-foreground">
                {selectedProject.title}
              </h3>

              <p className="mt-5 text-lg leading-relaxed text-surface-dark-muted">
                {selectedProject.description}
              </p>

              {selectedProject.metrics && Object.keys(selectedProject.metrics).length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-surface-dark-border pt-6 sm:grid-cols-4">
                  {Object.entries(selectedProject.metrics).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-surface-dark-muted">{key}</dt>
                      <dd className="mt-1 font-serif text-2xl font-semibold text-surface-dark-foreground">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 border-t border-surface-dark-border pt-6">
                <a
                  href="#kontak"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-surface-dark-foreground px-6 py-3 font-semibold text-surface-dark transition-opacity hover:opacity-90"
                >
                  Diskusikan desain serupa
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
