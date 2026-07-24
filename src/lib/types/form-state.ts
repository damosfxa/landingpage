/**
 * State bersama untuk `useActionState`.
 *
 * Sengaja dipisah dari file `"use server"` — file Server Action hanya boleh
 * mengekspor async function, sehingga konstanta seperti ini tidak bisa
 * ditaruh di sana.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type LeadFormState = FormState;
export type AdminFormState = FormState;
export type AuthFormState = FormState;

export const initialFormState: FormState = { status: "idle", message: "" };
export const initialLeadFormState: LeadFormState = initialFormState;
export const initialAdminFormState: AdminFormState = initialFormState;
export const initialAuthFormState: AuthFormState = initialFormState;
