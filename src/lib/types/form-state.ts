/**
 * State bersama untuk `useActionState`.
 *
 * Sengaja dipisah dari file `"use server"`, karena file Server Action hanya boleh
 * mengekspor async function, sehingga konstanta seperti ini tidak bisa
 * ditaruh di sana.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type LeadFormState = FormState & {
  /**
   * `true` hanya kalau lead sungguhan tersimpan ke database. Honeypot juga
   * mengembalikan `status: "success"` (supaya bot tidak tahu ditolak), tapi
   * dengan ini `false`/`undefined` -- tanpa penanda ini, event konversi GA4
   * akan ikut menghitung submission bot sebagai lead asli.
   */
  leadCaptured?: boolean;
};
export type AdminFormState = FormState;
export type AuthFormState = FormState;

export const initialFormState: FormState = { status: "idle", message: "" };
export const initialLeadFormState: LeadFormState = initialFormState;
export const initialAdminFormState: AdminFormState = initialFormState;
export const initialAuthFormState: AuthFormState = initialFormState;
