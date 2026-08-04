declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Kirim event GA4. No-op yang aman bila GA belum dimuat -- baik karena
 * `NEXT_PUBLIC_GA_ID` tidak di-set (lihat layout.tsx) maupun karena
 * ad blocker/Do Not Track di sisi pengunjung.
 */
function track(name: string, params?: Record<string, string>): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/** Klik salah satu CTA WhatsApp. `location` menandai titik CTA-nya di halaman. */
export function trackWhatsAppClick(location: string): void {
  track("contact", { method: "whatsapp", location });
}

/** Submit form lead berhasil tersimpan. */
export function trackLeadSubmit(): void {
  track("generate_lead");
}
