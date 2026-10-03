"use client";

import { ArrowRight, Building2, HeartPulse, ShieldCheck, Wrench } from "lucide-react";
import { useDemoLogin } from "@/hooks/use-auth";
import { demoAccounts } from "@/lib/domain/demo-accounts";
import type { UserRole } from "@/types";

const icons = { hospital_admin: Building2, nurse: HeartPulse, technician: Wrench, super_admin: ShieldCheck } as const;
const roles: UserRole[] = ["hospital_admin", "nurse", "technician", "super_admin"];

export function DemoAccounts() {
  const demo = useDemoLogin();
  return (
    <section aria-labelledby="demo-heading" className="mt-10 space-y-4">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <h2 id="demo-heading" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Demo accounts</h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {roles.map((role) => {
          const Icon = icons[role];
          const account = demoAccounts[role];
          const pending = demo.isPending && demo.variables === role;
          return (
            <li key={role}>
              <button
                type="button"
                onClick={() => demo.mutate(role)}
                disabled={demo.isPending}
                aria-busy={pending || undefined}
                className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-lift)] disabled:opacity-60"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className={pending ? "size-4 animate-pulse" : "size-4"} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">Login as {account.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{account.description}</span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
