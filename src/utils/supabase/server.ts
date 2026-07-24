import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/lib/types/database";

/**
 * Supabase client untuk Server Components, Server Actions, dan Route Handlers.
 * Selalu buat client baru per-request — jangan di-share antar request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Dipanggil dari Server Component, yang tidak boleh menulis cookie.
            // Aman diabaikan: proxy.ts sudah merefresh session di setiap request.
          }
        },
      },
    },
  );
}
