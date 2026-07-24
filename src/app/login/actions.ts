"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { AuthFormState } from "@/lib/types/form-state";
import { credentialsSchema } from "@/lib/validations/schemas";
import { createClient } from "@/utils/supabase/server";

/** Hanya izinkan redirect internal — cegah open redirect lewat `?next=`. */
function safeNextPath(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : "/admin";
}

/** AC-1.1 — Login admin via email/password Supabase Auth. */
export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Email atau password tidak valid.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { status: "error", message: `Gagal login: ${error.message}` };
  }

  revalidatePath("/", "layout");
  redirect(safeNextPath(formData.get("next")));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
