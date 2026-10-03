"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useMyTechnicianProfile } from "@/hooks/use-technicians";

export function VerificationBanner() {
  const profile = useMyTechnicianProfile();
  const status = profile.data?.verificationStatus;
  if (!status || status === "verified") return null;
  return (
    <aside aria-label="Verification status" className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-4 text-sm">
      <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
      <p className="text-foreground">
        {status === "pending" ? "Your documents are being reviewed. You can browse jobs, and you'll be able to accept them once you're verified." : "Your verification was not approved. Upload new documents to try again."}{" "}
        <Link href="/tech/profile" className="font-medium text-primary hover:underline">Go to verification</Link>
      </p>
    </aside>
  );
}
