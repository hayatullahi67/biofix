import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: { template: "%s · Nurse | Biofix", default: "Nurse dashboard" },
  robots: privateRobots,
};

export default function NurseLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="nurse">{children}</DashboardShell>;
}
