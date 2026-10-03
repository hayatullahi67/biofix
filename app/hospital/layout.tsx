import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hospital dashboard",
  robots: privateRobots,
};

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="hospital_admin">{children}</DashboardShell>;
}
