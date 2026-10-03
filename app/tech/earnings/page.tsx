import type { Metadata } from "next";
import { EarningsOverview } from "@/components/tech/earnings-overview";

export const metadata: Metadata = { title: "Earnings" };

export default function EarningsPage() {
  return <EarningsOverview />;
}
