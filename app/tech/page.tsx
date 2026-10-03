import type { Metadata } from "next";
import { TechJobsBoard } from "@/components/tech/tech-jobs-board";

export const metadata: Metadata = { title: "Jobs" };

export default function TechJobsPage() {
  return <TechJobsBoard />;
}
