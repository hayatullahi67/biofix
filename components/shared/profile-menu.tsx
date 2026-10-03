"use client";

import { ChevronDown, LogOut, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-auth";
import { useCurrentUser } from "@/hooks/use-session";
import { roleHome, roleLabels } from "@/lib/domain/roles";
import { ThemeToggle } from "./theme-toggle";

const accountHref = { hospital_admin: "/hospital/settings", nurse: "/nurse", technician: "/tech/profile", super_admin: "/admin" } as const;

export function ProfileMenu() {
  const user = useCurrentUser();
  const logout = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open profile menu">
        <Avatar name={user.name} src={user.avatarUrl} size="sm" />
        <span className="hidden max-w-32 truncate text-sm font-medium lg:inline">{user.name.split(" ")[0]}</span>
        <ChevronDown className="hidden size-3.5 text-muted-foreground lg:inline" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="space-y-0.5">
          <span className="block text-sm font-semibold text-foreground">{user.name}</span>
          <span className="block truncate font-normal">{user.email}</span>
          <span className="block font-normal text-primary">{roleLabels[user.role]}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountHref[user.role] ?? roleHome[user.role]}>
            <UserRound aria-hidden="true" />
            Account
          </Link>
        </DropdownMenuItem>
        {user.role === "hospital_admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/hospital/team">
              <Users aria-hidden="true" />
              Team
            </Link>
          </DropdownMenuItem>
        ) : null}
        <div className="flex items-center justify-between px-2.5 py-1.5 text-sm">
          <span>Theme</span>
          <ThemeToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logout} className="text-danger data-[highlighted]:bg-danger-soft [&_svg]:text-danger">
          <LogOut aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
