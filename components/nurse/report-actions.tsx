"use client";

import Link from "next/link";
import { ArrowRight, QrCode, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { QRScanner } from "@/components/shared/qr-scanner";
import { Button } from "@/components/ui/button";

export function ReportActions() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const onScan = useCallback(
    (code: string) => {
      setScanning(false);
      router.push(`/nurse/report?machine=${encodeURIComponent(code)}`);
    },
    [router],
  );

  return (
    <section aria-label="Report a fault" className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
      <Link
        href="/nurse/report"
        className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 p-6 text-white shadow-[var(--shadow-lift)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        <span className="bg-grid absolute inset-0 opacity-15" aria-hidden="true" />
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <TriangleAlert className="size-6" aria-hidden="true" />
        </span>
        <span className="relative flex items-end justify-between gap-4">
          <span>
            <span className="block text-xl font-semibold tracking-tight">Report broken machine</span>
            <span className="block text-sm text-teal-50/80">Photo, what&apos;s wrong, urgency. Done.</span>
          </span>
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
      <Button variant="outline" onClick={() => setScanning(true)} className="h-auto min-h-24 flex-col gap-2 rounded-2xl text-base sm:min-h-40">
        <QrCode className="!size-7 text-primary" aria-hidden="true" />
        Scan QR
        <span className="text-xs font-normal text-muted-foreground">Point at the machine sticker</span>
      </Button>
      <QRScanner open={scanning} onOpenChange={setScanning} onScan={onScan} />
    </section>
  );
}
