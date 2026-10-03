import type { Metadata } from "next";
import { Suspense } from "react";
import { EquipmentList } from "@/components/hospital/equipment-list";

export const metadata: Metadata = { title: "Equipment" };

export default function EquipmentPage() {
  return (
    <Suspense>
      <EquipmentList />
    </Suspense>
  );
}
