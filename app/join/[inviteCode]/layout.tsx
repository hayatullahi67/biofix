import type { Metadata } from "next";
import { privateRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Join your hospital",
  robots: privateRobots,
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
