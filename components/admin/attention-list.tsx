"use client";

import Link from "next/link";
import { ChevronRight, Scale, ShieldCheck } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import type { PlatformStats } from "@/types";

export function AttentionList({ stats }: { stats: PlatformStats }) {
  const items = [
    { href: "/admin/technicians", icon: ShieldCheck, label: "Technicians awaiting verification", count: stats.pendingVerifications },
    { href: "/admin/jobs", icon: Scale, label: "Open disputes", count: stats.openDisputes },
  ];
  return (
    <SectionCard id="attention" title="Needs your attention">
      <ul className="-mx-2 divide-y divide-border">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60">
              <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary"><item.icon className="size-4" aria-hidden="true" /></span>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm font-semibold tabular-nums">{item.count}</span>
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
