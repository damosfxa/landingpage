"use client";

import { useActionState, useEffect } from "react";
import { submitLead } from "@/lib/actions/leads";
import { initialLeadFormState } from "@/lib/types/form-state";
import { Loader2, Send, Check } from "lucide-react";
import { toast } from "sonner";

const fields = [
  {
    id: "lead-name",
    name: "name" as const,
    label: "Nama lengkap",
    type: "text",
    autoComplete: "name",
    placeholder: "Budi Santoso",
    required: true,
  },
  {
    id: "lead-phone",
    name: "phone" as const,
    label: "No. WhatsApp",
    type: "tel",
    autoComplete: "tel",
    placeholder: "081234567890",
    required: true,
  },
  {
    id: "lead-agency",
    name: "agency_name" as const,
    label: "Nama perusahaan / bisnis",
    type: "text",
    autoComplete: "organization",
    placeholder: "PT Visi Nusantara",
    required: false,
  },
];

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialLeadFormState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="border border-surface-dark-border bg-surface-dark p-8 text-center">
        <Check className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-semibold text-surface-dark-foreground">
          Terima kasih
        </h3>
        <p className="mt-2 text-surface-dark-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="border border-surface-dark-border bg-surface-dark p-8">
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-surface-dark-foreground"
            >
              {field.label}
              {!field.required && (
                <span className="ml-1 font-normal text-surface-dark-muted">(opsional)</span>
              )}
            </label>
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-md border border-surface-dark-border bg-background/5 px-4 py-3 text-surface-dark-foreground placeholder:text-surface-dark-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {state.fieldErrors?.[field.name] && (
              <p className="mt-2 text-sm text-destructive-foreground">
                {state.fieldErrors[field.name]!.join(", ")}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Mengirim data...
            </>
          ) : (
            <>
              Kirim &amp; minta dihubungi
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        {state.status === "error" && (
          <p className="rounded-md border border-surface-dark-border px-4 py-3 text-center text-sm text-surface-dark-foreground">
            Gagal mengirim pesan. Silakan cek isian Anda dan coba lagi.
          </p>
        )}
      </div>
    </form>
  );
}
