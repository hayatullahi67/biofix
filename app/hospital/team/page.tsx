import type { Metadata } from "next";
import { TeamOverview } from "@/components/hospital/team-overview";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return <TeamOverview />;
}
