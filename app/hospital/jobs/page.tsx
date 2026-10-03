import type { Metadata } from "next";
import { Suspense } from "react";
import { JobsBoard } from "@/components/hospital/jobs-board";

export const metadata: Metadata = { title: "Jobs" };

export default function HospitalJobsPage() {
  return (
    <Suspense>
      <JobsBoard />
    </Suspense>
  );
}
