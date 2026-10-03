import type { Metadata } from "next";
import { TechJobDetails } from "@/components/tech/tech-job-details";

export const metadata: Metadata = { title: "Job details" };

export default async function TechJobPage({ params }: PageProps<"/tech/jobs/[id]">) {
  const { id } = await params;
  return <TechJobDetails id={id} />;
}
