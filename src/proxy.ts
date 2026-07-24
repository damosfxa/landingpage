import type { NextRequest } from "next/server";

import { updateSession } from "@/utils/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Sengaja dibatasi ke rute auth/admin saja supaya 180 halaman SEO statis
  // di `/layanan/*` tidak ikut jadi dinamis.
  matcher: ["/admin/:path*", "/login"],
};
