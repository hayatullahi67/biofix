import type { Metadata } from "next";
import { HospitalsAdmin } from "@/components/admin/hospitals-admin";

export const metadata: Metadata = { title: "Hospitals" };

export default function AdminHospitalsPage() {
  return <HospitalsAdmin />;
}
