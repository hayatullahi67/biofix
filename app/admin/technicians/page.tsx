import type { Metadata } from "next";
import { TechniciansAdmin } from "@/components/admin/technicians-admin";

export const metadata: Metadata = { title: "Technicians" };

export default function AdminTechniciansPage() {
  return <TechniciansAdmin />;
}
