"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/hooks/use-session";
import { roleHome } from "@/lib/domain/roles";
import type { UserRole } from "@/types";
import { LogoMark } from "@/components/shared/logo";

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
}

function FullScreenLoader() {
  return (
    <div role="status" className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <LogoMark className="size-10 animate-pulse" />
      <span className="text-sm text-muted-foreground">Loading your workspace…</span>
    </div>
  );
}

export function RoleGuard({ roles, children }: RoleGuardProps) {
  const { user, hydrated } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const allowed = Boolean(user && roles.includes(user.role));

  useEffect(() => {
    if (!hydrated) return;
    if (!user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (!roles.includes(user.role)) router.replace(roleHome[user.role]);
  }, [hydrated, user, roles, router, pathname]);

  if (!hydrated || !allowed) return <FullScreenLoader />;
  return <>{children}</>;
}
