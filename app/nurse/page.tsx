import type { Metadata } from "next";
import { NurseHome } from "@/components/nurse/nurse-home";

export const metadata: Metadata = { title: "Home" };

export default function NurseHomePage() {
  return <NurseHome />;
}
