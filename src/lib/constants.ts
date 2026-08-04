/** Nama merek resmi. Dipakai di UI maupun metadata supaya tidak bercabang lagi. */
export const BRAND_NAME = "Voxy Web Studio";

/** Domain kanonik. Tanpa garis miring di akhir, sesuai canonical dan sitemap. */
export const SITE_URL = "https://www.byvoxy.com";

/** Nomor WhatsApp bisnis, format internasional tanpa tanda plus (dipakai wa.me). */
export const WA_NUMBER = "6285111601910";

/** Versi nomor WA yang enak dibaca manusia. */
export const WA_NUMBER_DISPLAY = "+62 851-1160-1910";

/**
 * Bangun tautan wa.me lengkap dengan pesan awal yang sudah ter-encode.
 *
 * Sebelumnya nomor dan pesan di-hardcode di 8 file berbeda, jadi mengganti
 * nomor berarti 8 kali edit dengan risiko satu terlewat.
 */
export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
