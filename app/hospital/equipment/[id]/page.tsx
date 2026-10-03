import type { Metadata } from "next";
import { EquipmentDetails } from "@/components/hospital/equipment-details";

export const metadata: Metadata = { title: "Equipment details" };

export default async function EquipmentDetailsPage({ params }: PageProps<"/hospital/equipment/[id]">) {
  const { id } = await params;
  return <EquipmentDetails id={id} />;
}
