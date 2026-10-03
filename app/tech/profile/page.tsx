import type { Metadata } from "next";
import { TechProfile } from "@/components/tech/tech-profile";

export const metadata: Metadata = { title: "Profile" };

export default function TechProfilePage() {
  return <TechProfile />;
}
