"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/actions/leads";
import { initialLeadFormState } from "@/lib/types/form-state";
import { Loader2, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { trackLeadSubmit } from "@/lib/analytics";

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialLeadFormState);

  // Trigger toast on status change
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      // Honeypot juga mengembalikan "success" supaya bot tidak tahu ditolak --
      // leadCaptured membedakan lead asli dari itu, supaya GA4 tidak menghitung
      // submission bot sebagai konversi.
      if (state.leadCaptured) trackLeadSubmit();
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-xl text-center"
      >
        <Check className="h-10 w-10 text-primary mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-bold text-foreground mb-2">Terima Kasih!</h3>
        <p className="text-muted-foreground">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="bg-card border-t-4 border-tertiary p-8 rounded-xl shadow-lg relative">

      <div className="space-y-6">
        {/* Honeypot: disembunyikan dari manusia lewat CSS, bukan cuma
            display:none, supaya lebih sulit dideteksi bot sebagai jebakan. */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="lead-website">Situs Web</label>
          <input
            id="lead-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="lead-name" className="text-sm font-medium text-muted-foreground ml-1">Nama Lengkap</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Budi Santoso"
            className="w-full px-4 py-3.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          {state.fieldErrors?.name && (
            <p className="text-sm text-destructive ml-1">{state.fieldErrors.name.join(", ")}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label htmlFor="lead-phone" className="text-sm font-medium text-muted-foreground ml-1">No. WhatsApp</label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="081234567890"
            className="w-full px-4 py-3.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          {state.fieldErrors?.phone && (
            <p className="text-sm text-destructive ml-1">{state.fieldErrors.phone.join(", ")}</p>
          )}
        </div>

        {/* Agency Name Input */}
        <div className="space-y-2">
          <label htmlFor="lead-agency" className="text-sm font-medium text-muted-foreground ml-1">Nama Perusahaan / Bisnis <span className="text-muted-foreground font-normal">(Opsional)</span></label>
          <input
            id="lead-agency"
            name="agency_name"
            type="text"
            autoComplete="organization"
            placeholder="PT Visi Nusantara"
            className="w-full px-4 py-3.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          {state.fieldErrors?.agency_name && (
            <p className="text-sm text-destructive ml-1">{state.fieldErrors.agency_name.join(", ")}</p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground font-bold rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 group overflow-hidden relative"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Mengirim Data...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Kirim &amp; Minta Dihubungi</span>
              <Send className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          Dengan mengirim formulir ini, Anda menyetujui data Anda dipakai untuk
          dihubungi kembali sesuai{" "}
          <Link href="/privasi" className="underline underline-offset-2 hover:text-foreground">
            Kebijakan Privasi
          </Link>{" "}
          kami.
        </p>

        <AnimatePresence>
          {state.status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm text-center"
            >
              Gagal mengirim pesan. Silakan cek form Anda dan coba lagi.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
