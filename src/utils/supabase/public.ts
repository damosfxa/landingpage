import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/types/database";

/**
 * Client Supabase untuk Server Component publik yang harus tetap statis/ISR
 * (contoh: homepage).
 *
 * Sengaja bukan `createServerClient` dari `@supabase/ssr` -- itu butuh
 * `cookies()`, dan memanggil `cookies()` di Server Component memaksa seluruh
 * rute jadi dynamic rendering meski halamannya tidak butuh sesi user sama
 * sekali. Client ini hanya cocok untuk data yang memang publik lewat RLS
 * (`to anon`); untuk apa pun yang butuh identitas user, pakai `server.ts`.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
