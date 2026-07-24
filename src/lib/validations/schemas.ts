import { z } from "zod";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Nomor WhatsApp hanya boleh berisi angka"),
  agency_name: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value ? value : null)),
});

export type LeadInput = z.input<typeof leadSchema>;

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter").max(120),
  slug: z
    .string()
    .trim()
    .min(3, "Slug minimal 3 karakter")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  description: z.string().trim().min(10, "Deskripsi minimal 10 karakter").max(2000),
  image_url: z.string().url("URL gambar tidak valid").nullable(),
  tech_stack: z.array(z.string().trim().min(1)).max(20),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).nullable(),
});

export type ProjectInput = z.input<typeof projectSchema>;

export const leadStatusSchema = z.enum(["NEW", "CONTACTED", "CLOSED"]);

export const credentialsSchema = z.object({
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

/** `"Next.js, Tailwind, Supabase"` → `["Next.js", "Tailwind", "Supabase"]` */
export function parseTechStack(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Mem-parse field `metrics` berformat JSON; string kosong → `null`. */
export function parseMetrics(raw: string): Record<string, string | number> | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const parsed: unknown = JSON.parse(trimmed);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Metrics harus berupa objek JSON");
  }
  return parsed as Record<string, string | number>;
}
