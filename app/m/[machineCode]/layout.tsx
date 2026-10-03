import type { Metadata } from "next";
import { MachinePageShell } from "@/components/machine/machine-page-shell";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Machine",
  robots: privateRobots,
};

export default function MachineLayout({ children }: { children: React.ReactNode }) {
  return <MachinePageShell>{children}</MachinePageShell>;
}
