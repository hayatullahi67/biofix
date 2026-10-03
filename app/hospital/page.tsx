import type { Metadata } from "next";
import { HospitalOverview } from "@/components/hospital/hospital-overview";

export const metadata: Metadata = { title: "Overview" };

export default function HospitalOverviewPage() {
  return <HospitalOverview />;
}
