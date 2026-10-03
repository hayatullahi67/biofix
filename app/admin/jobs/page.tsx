import type { Metadata } from "next";
import { JobsAdmin } from "@/components/admin/jobs-admin";

export const metadata: Metadata = { title: "Jobs" };

export default function AdminJobsPage() {
  return <JobsAdmin />;
}
