import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: privateRobots,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="super_admin">{children}</DashboardShell>;
}
