"use server";

import type { LeadFormState } from "@/lib/types/form-state";
import { leadSchema } from "@/lib/validations/schemas";
import { createClient } from "@/utils/supabase/server";

/**
 * AC-3.1 — Submit lead dari landing page.
 * Publik (anon, tanpa login). Diizinkan oleh policy `leads_insert_public`.
 */
export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    agency_name: formData.get("agency_name") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Data belum lengkap. Periksa kembali isian Anda.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    agency_name: parsed.data.agency_name,
    status: "NEW",
  });

  if (error) {
    console.error("submitLead failed:", error.message);
    return {
      status: "error",
      message: "Gagal mengirim data. Silakan coba lagi.",
    };
  }

  return {
    status: "success",
    message: "Terima kasih! Tim kami akan menghubungi Anda segera.",
  };
}
