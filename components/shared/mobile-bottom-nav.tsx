"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavActive, roleNavigation } from "@/lib/domain/navigation";
import { roleHome } from "@/lib/domain/roles";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export function MobileBottomNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = roleNavigation[role].filter((item) => !item.desktopOnly);
  return (
    <nav aria-label="Mobile navigation" className="glass fixed inset-x-0 bottom-0 z-40 border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="mx-auto grid max-w-md" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const active = isNavActive(pathname, item.href, roleHome[role]);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground")}
              >
                <span className={cn("flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200", active && "bg-accent")}>
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
