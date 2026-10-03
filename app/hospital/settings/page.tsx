import type { Metadata } from "next";
import { HospitalSettings } from "@/components/hospital/hospital-settings";

export const metadata: Metadata = { title: "Reports and settings" };

export default function SettingsPage() {
  return <HospitalSettings />;
}
