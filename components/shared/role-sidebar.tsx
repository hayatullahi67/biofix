"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { isNavActive, roleNavigation } from "@/lib/domain/navigation";
import { roleHome, roleLabels } from "@/lib/domain/roles";
import { useUiStore } from "@/lib/stores/ui-store";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { Logo } from "./logo";

export function RoleSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggle = useUiStore((state) => state.toggleSidebar);
  const items = roleNavigation[role];

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-card/60 transition-[width] duration-300 ease-out md:flex",
        collapsed ? "w-[76px]" : "w-64",
      )}
    >
      <div className={cn("flex h-16 items-center", collapsed ? "justify-center" : "px-5")}>
        <Logo href={roleHome[role]} collapsed={collapsed} />
      </div>
      {!collapsed ? <p className="px-5 pt-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{roleLabels[role]}</p> : null}
      <nav aria-label="Dashboard navigation" className="flex-1 px-3">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = isNavActive(pathname, item.href, roleHome[role]);
            return (
              <li key={item.href}>
                <Tooltip label={item.label} disabled={!collapsed}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-200",
                      collapsed && "justify-center px-0",
                      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className={cn("size-[18px] shrink-0", active ? "text-primary" : "")} aria-hidden="true" />
                    <span className={cn(collapsed && "sr-only")}>{item.label}</span>
                  </Link>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
      <footer className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
        <button
          type="button"
          onClick={toggle}
          className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeftOpen className="size-4" aria-hidden="true" /> : <PanelLeftClose className="size-4" aria-hidden="true" />}
          {!collapsed ? "Collapse" : null}
        </button>
      </footer>
    </aside>
  );
}
