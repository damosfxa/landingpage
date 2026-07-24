"use client";

import { useActionState, useEffect } from "react";
import { submitLead } from "@/lib/actions/leads";
import { initialLeadFormState } from "@/lib/types/form-state";
import { Loader2, Send, CheckCircle2, User, Phone, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialLeadFormState);

  // Trigger toast on status change
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center"
      >
        <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Terima Kasih!</h3>
        <p className="text-slate-300">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50" />
      
      <div className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="lead-name" className="text-sm font-medium text-slate-300 ml-1">Nama Lengkap</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              id="lead-name" 
              name="name" 
              type="text" 
              required 
              autoComplete="name" 
              placeholder="Haji Fulan"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          {state.fieldErrors?.name && (
            <p className="text-sm text-red-400 ml-1">{state.fieldErrors.name.join(", ")}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label htmlFor="lead-phone" className="text-sm font-medium text-slate-300 ml-1">No. WhatsApp</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              id="lead-phone" 
              name="phone" 
              type="tel" 
              required 
              autoComplete="tel"
              placeholder="081234567890"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          {state.fieldErrors?.phone && (
            <p className="text-sm text-red-400 ml-1">{state.fieldErrors.phone.join(", ")}</p>
          )}
        </div>

        {/* Agency Name Input */}
        <div className="space-y-2">
          <label htmlFor="lead-agency" className="text-sm font-medium text-slate-300 ml-1">Nama Biro Travel <span className="text-slate-500 font-normal">(Opsional)</span></label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              id="lead-agency" 
              name="agency_name" 
              type="text" 
              autoComplete="organization"
              placeholder="Al-Hijrah Tour & Travel"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          {state.fieldErrors?.agency_name && (
            <p className="text-sm text-red-400 ml-1">{state.fieldErrors.agency_name.join(", ")}</p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 group overflow-hidden relative"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Mengirim Data...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Konsultasi Gratis Sekarang</span>
              <Send className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        <AnimatePresence>
          {state.status === "error" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center"
            >
              Gagal mengirim pesan. Silakan cek form Anda dan coba lagi.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
