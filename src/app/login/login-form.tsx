"use client";

import { useActionState } from "react";
import { initialAuthFormState } from "@/lib/types/form-state";
import { login } from "./actions";
import { Loader2, AlertCircle } from "lucide-react";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState(login, initialAuthFormState);

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-sm border border-surface-dark-border bg-surface-dark p-8"
    >
      <h1 className="font-serif text-2xl font-semibold text-surface-dark-foreground">
        Voxy Admin
      </h1>
      <p className="mt-1 text-sm text-surface-dark-muted">Masuk untuk mengelola lead dan portofolio.</p>

      <input type="hidden" name="next" value={next} />

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-surface-dark-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@voxy.dev"
            className="mt-2 w-full rounded-md border border-surface-dark-border bg-background/5 px-3 py-2.5 text-surface-dark-foreground placeholder:text-surface-dark-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-surface-dark-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-surface-dark-border bg-background/5 px-3 py-2.5 text-surface-dark-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Memproses...
            </>
          ) : (
            "Masuk ke dashboard"
          )}
        </button>

        {state.status === "error" ? (
          <div className="flex items-start gap-2 rounded-md border border-surface-dark-border px-3 py-2.5 text-sm text-surface-dark-foreground">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive-foreground" aria-hidden="true" />
            <p role="alert">{state.message}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
