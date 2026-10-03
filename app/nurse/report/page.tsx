import type { Metadata } from "next";
import { Suspense } from "react";
import { ReportFaultFlow } from "@/components/nurse/report-fault-flow";

export const metadata: Metadata = { title: "Report fault" };

export default function ReportFaultPage() {
  return (
    <Suspense>
      <ReportFaultFlow />
    </Suspense>
  );
}
