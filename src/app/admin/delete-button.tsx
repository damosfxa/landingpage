"use client";

import { Trash2 } from "lucide-react";

type Props = {
  /** Ditampilkan di dialog konfirmasi, mis. nama lead atau judul project. */
  label: string;
  /** Teks untuk pembaca layar, karena tombolnya hanya berisi ikon. */
  srLabel: string;
};

/**
 * Tombol hapus dengan konfirmasi.
 *
 * `deleteLead`/`deleteProject` menghapus permanen tanpa jalan kembali, dan
 * sebelumnya satu klik salah langsung menghilangkan datanya. `confirm()` bawaan
 * browser dipilih supaya tidak menambah dependensi dialog hanya untuk area
 * admin satu orang; kalau nanti butuh yang lebih rapi, tinggal ganti isinya.
 */
export function DeleteButton({ label, srLabel }: Props) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(
          `Hapus "${label}" secara permanen? Tindakan ini tidak bisa dibatalkan.`,
        );
        if (!confirmed) event.preventDefault();
      }}
      aria-label={srLabel}
      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
