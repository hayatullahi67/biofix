"use client";

import { MobileBottomNav } from "@/components/shared/mobile-bottom-nav";
import { RoleSidebar } from "@/components/shared/role-sidebar";
import type { UserRole } from "@/types";
import { DashboardTopBar } from "./dashboard-top-bar";
import { RoleGuard } from "./role-guard";
import { SkipLink } from "./skip-link";

interface DashboardShellProps {
  role: UserRole;
  children: React.ReactNode;
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  return (
    <RoleGuard roles={[role]}>
      <SkipLink />
      <div className="flex min-h-dvh">
        <RoleSidebar role={role} />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar role={role} />
          <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 pb-28 sm:px-6 md:pb-12 lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </div>
      <MobileBottomNav role={role} />
    </RoleGuard>
  );
}
