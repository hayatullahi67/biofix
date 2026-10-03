"use client";

import { Logo } from "@/components/shared/logo";
import { NotificationBell } from "@/components/shared/notification-bell";
import { ProfileMenu } from "@/components/shared/profile-menu";
import { useMyHospital } from "@/hooks/use-hospitals";
import { roleHome, roleLabels } from "@/lib/domain/roles";
import type { UserRole } from "@/types";

function WorkspaceLabel({ role }: { role: UserRole }) {
  const hospital = useMyHospital();
  const label = role === "hospital_admin" || role === "nurse" ? hospital.data?.name : roleLabels[role];
  return <p className="hidden truncate text-sm font-medium text-muted-foreground md:block">{label ?? " "}</p>;
}

export function DashboardTopBar({ role }: { role: UserRole }) {
  return (
    <header className="glass sticky top-0 z-30 border-b border-border pt-[env(safe-area-inset-top)]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Logo href={roleHome[role]} className="md:hidden" />
          <WorkspaceLabel role={role} />
        </div>
        <div className="flex items-center gap-1.5">
          <NotificationBell />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
