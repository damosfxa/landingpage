import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/types/database";

/**
 * Merefresh session Supabase dan memproteksi rute `/admin/*`.
 *
 * Dipanggil dari `src/proxy.ts`. Response yang dikembalikan harus dipakai apa
 * adanya supaya cookie hasil refresh token ikut terkirim ke browser.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          // Response yang menulis cookie auth tidak boleh di-cache CDN.
          for (const [key, headerValue] of Object.entries(headers)) {
            response.headers.set(key, headerValue);
          }
        },
      },
    },
  );

  // JANGAN sisipkan kode antara createServerClient dan getUser(): getUser()
  // memvalidasi token ke Auth server dan memicu penulisan cookie refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // AC-1.2 — non-login yang membuka /admin dilempar ke /login.
  if (!user && pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // Sudah login tapi membuka /login → langsung ke dashboard.
  // Dibatasi ke `/login` persis agar tidak terjadi loop redirect.
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
