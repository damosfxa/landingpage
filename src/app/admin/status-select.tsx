"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateLeadStatus } from "./actions";
import type { Lead } from "@/lib/types/database";

type Props = {
  id: string;
  currentStatus: Lead["status"];
};

const STATUSES: Lead["status"][] = ["NEW", "CONTACTED", "CLOSED"];

export function StatusSelect({ id, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", newStatus);

    startTransition(async () => {
      try {
        await updateLeadStatus(formData);
        toast.success(`Status berhasil diperbarui ke ${newStatus}`);
      } catch (error) {
        toast.error("Gagal memperbarui status.");
      }
    });
  };

  return (
    <select
      disabled={isPending}
      name="status"
      defaultValue={currentStatus}
      onChange={handleChange}
      className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 focus:ring-primary appearance-none cursor-pointer transition-opacity ${
        isPending ? "opacity-50" : "opacity-100"
      } ${
        currentStatus === "NEW"
          ? "bg-amber-500/10 text-amber-500"
          : currentStatus === "CONTACTED"
          ? "bg-blue-500/10 text-blue-500"
          : "bg-emerald-500/10 text-emerald-500"
      }`}
    >
      {STATUSES.map((status) => (
        <option key={status} value={status} className="bg-slate-900 text-slate-200">
          {status}
        </option>
      ))}
    </select>
  );
}
