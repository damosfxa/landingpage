"use client";

import { useActionState } from "react";
import { initialAuthFormState } from "@/lib/types/form-state";
import { login } from "./actions";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState(login, initialAuthFormState);

  return (
    <motion.form 
      action={formAction}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 opacity-50" />
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-2">Voxy Admin</h1>
        <p className="text-sm text-muted-foreground">Log in to manage your digital empire</p>
      </div>

      <input type="hidden" name="next" value={next} />

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              autoComplete="email" 
              placeholder="admin@voxy.dev"
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-300 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk ke Dashboard</span>
          )}
        </button>

        {state.status === "error" ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mt-4"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p role="alert">{state.message}</p>
          </motion.div>
        ) : null}
      </div>
    </motion.form>
  );
}
