import {
  Briefcase,
  Building2,
  ClipboardList,
  House,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  MonitorCog,
  Settings,
  ShieldCheck,
  TriangleAlert,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  desktopOnly?: boolean;
}

export const roleNavigation: Record<UserRole, NavItem[]> = {
  hospital_admin: [
    { href: "/hospital", label: "Overview", icon: LayoutDashboard },
    { href: "/hospital/equipment", label: "Equipment", icon: MonitorCog },
    { href: "/hospital/jobs", label: "Jobs", icon: Wrench },
    { href: "/hospital/messages", label: "Messages", icon: MessageSquare },
    { href: "/hospital/team", label: "Team", icon: Users, desktopOnly: true },
    { href: "/hospital/settings", label: "Settings", icon: Settings },
  ],
  nurse: [
    { href: "/nurse", label: "Home", icon: House },
    { href: "/nurse/report", label: "Report fault", icon: TriangleAlert },
    { href: "/nurse/messages", label: "Messages", icon: MessageSquare },
  ],
  technician: [
    { href: "/tech", label: "Jobs", icon: Briefcase },
    { href: "/tech/messages", label: "Messages", icon: MessageSquare },
    { href: "/tech/earnings", label: "Earnings", icon: Wallet },
    { href: "/tech/profile", label: "Profile", icon: UserRound },
  ],
  super_admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/technicians", label: "Technicians", icon: ShieldCheck },
    { href: "/admin/hospitals", label: "Hospitals", icon: Building2 },
    { href: "/admin/jobs", label: "Jobs", icon: ClipboardList },
  ],
};

export function isNavActive(pathname: string, href: string, rootHref: string): boolean {
  if (href !== rootHref) return pathname === href || pathname.startsWith(`${href}/`);
  return pathname === href || (href === "/tech" && pathname.startsWith("/tech/jobs/"));
}
