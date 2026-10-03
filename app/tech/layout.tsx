import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: { template: "%s · Technician | Biofix", default: "Technician dashboard" },
  robots: privateRobots,
};

export default function TechnicianLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="technician">{children}</DashboardShell>;
}
