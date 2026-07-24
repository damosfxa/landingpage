"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { LeadStatus } from "@/lib/types/database";
import type { AdminFormState } from "@/lib/types/form-state";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  leadStatusSchema,
  parseMetrics,
  parseTechStack,
  projectSchema,
} from "@/lib/validations/schemas";
import { createClient } from "@/utils/supabase/server";

const BUCKET = "portfolio_images";

/**
 * Server Action adalah POST ke rute tempat ia dipakai — proxy matcher bisa
 * berubah sewaktu-waktu, jadi auth wajib dicek ulang di dalam setiap action.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return { supabase, user };
}

/**
 * AC-2.2 — Upload gambar ke Supabase Storage, kembalikan `publicUrl`.
 * Mengembalikan `null` bila tidak ada file yang dipilih.
 */
export async function uploadProjectImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Format gambar harus JPEG, PNG, WebP, atau AVIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ukuran gambar maksimal 5 MB.");
  }

  const { supabase } = await requireAdmin();

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}

/** AC-2.1 — Validasi input, upload gambar (bila ada), simpan ke tabel `projects`. */
export async function createProject(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { supabase } = await requireAdmin();

  let metrics: Record<string, string | number> | null;
  try {
    metrics = parseMetrics(String(formData.get("metrics") ?? ""));
  } catch {
    return {
      status: "error",
      message: "Metrics harus berupa objek JSON yang valid.",
      fieldErrors: { metrics: ["Format JSON tidak valid"] },
    };
  }

  let imageUrl: string | null = null;
  try {
    const image = formData.get("image");
    if (image instanceof File) {
      imageUrl = await uploadProjectImage(image);
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengunggah gambar.",
    };
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    image_url: imageUrl,
    tech_stack: parseTechStack(String(formData.get("tech_stack") ?? "")),
    metrics,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Data project belum valid.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) {
    return {
      status: "error",
      message:
        error.code === "23505"
          ? "Slug sudah dipakai project lain."
          : `Gagal menyimpan project: ${error.message}`,
    };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { supabase } = await requireAdmin();

  let metrics: Record<string, string | number> | null;
  try {
    metrics = parseMetrics(String(formData.get("metrics") ?? ""));
  } catch {
    return {
      status: "error",
      message: "Metrics harus berupa objek JSON yang valid.",
      fieldErrors: { metrics: ["Format JSON tidak valid"] },
    };
  }

  // Pertahankan gambar lama bila admin tidak mengunggah file baru.
  let imageUrl = (formData.get("current_image_url") as string) || null;
  try {
    const image = formData.get("image");
    if (image instanceof File && image.size > 0) {
      imageUrl = await uploadProjectImage(image);
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengunggah gambar.",
    };
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    image_url: imageUrl,
    tech_stack: parseTechStack(String(formData.get("tech_stack") ?? "")),
    metrics,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Data project belum valid.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { error } = await supabase.from("projects").update(parsed.data).eq("id", id);

  if (error) {
    return { status: "error", message: `Gagal memperbarui project: ${error.message}` };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id"));

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus project: ${error.message}`);

  revalidatePath("/admin/projects");
}

export async function updateLeadStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id"));
  const parsed = leadStatusSchema.safeParse(formData.get("status"));
  if (!parsed.success) throw new Error("Status lead tidak valid.");

  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data as LeadStatus })
    .eq("id", id);

  if (error) throw new Error(`Gagal memperbarui status lead: ${error.message}`);

  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id"));

  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus lead: ${error.message}`);

  revalidatePath("/admin");
}
