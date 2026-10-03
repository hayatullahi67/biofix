"use client";

import { RoleGuard } from "@/components/layout/role-guard";
import { SkipLink } from "@/components/layout/skip-link";
import { Logo } from "@/components/shared/logo";
import { ProfileMenu } from "@/components/shared/profile-menu";
import { useSession } from "@/hooks/use-session";
import { roleHome } from "@/lib/domain/roles";

const allRoles = ["hospital_admin", "nurse", "technician", "super_admin"] as const;

function ShellHeader() {
  const { user } = useSession();
  return (
    <header className="glass sticky top-0 z-30 border-b border-border">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Logo href={user ? roleHome[user.role] : "/"} />
        <ProfileMenu />
      </div>
    </header>
  );
}

export function MachinePageShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={[...allRoles]}>
      <SkipLink />
      <ShellHeader />
      <main id="main-content" className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16">
        {children}
      </main>
    </RoleGuard>
  );
}
