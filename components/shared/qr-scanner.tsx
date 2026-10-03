"use client";

import { CameraOff, ScanLine } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { parseMachineCode } from "@/lib/utils/qr";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (machineCode: string) => void;
}

interface ScannerHandle {
  stop: () => Promise<void>;
  isScanning: boolean;
}

function ScannerViewport({ onScan }: { onScan: (code: string) => void }) {
  const regionId = useId().replace(/:/g, "");
  const [error, setError] = useState<string | null>(null);
  const handled = useRef(false);

  useEffect(() => {
    let scanner: ScannerHandle | null = null;
    let cancelled = false;
    void import("html5-qrcode").then(async ({ Html5Qrcode }) => {
      if (cancelled) return;
      const instance = new Html5Qrcode(regionId, { verbose: false });
      scanner = instance;
      try {
        await instance.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 }, aspectRatio: 1 },
          (decoded) => {
            const code = parseMachineCode(decoded);
            if (!code || handled.current) return;
            handled.current = true;
            onScan(code);
          },
          () => undefined,
        );
      } catch {
        setError("We couldn't open your camera. Allow camera access in your browser settings and try again.");
      }
    });
    return () => {
      cancelled = true;
      if (scanner?.isScanning) void scanner.stop();
    };
  }, [regionId, onScan]);

  if (error) {
    return (
      <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-10 text-center">
        <CameraOff className="size-8 text-danger" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-950">
      <div id={regionId} className="aspect-square w-full [&_video]:!h-full [&_video]:!w-full [&_video]:object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="size-60 rounded-3xl border-2 border-white/80 shadow-[0_0_0_9999px_rgb(2_6_23/0.45)]" />
        <ScanLine className="absolute size-10 animate-pulse text-teal-300" />
      </div>
    </div>
  );
}

export function QRScanner({ open, onOpenChange, onScan }: QRScannerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Scan machine QR code" description="Point your camera at the Biofix sticker on the machine." size="sm">
        {open ? <ScannerViewport onScan={onScan} /> : null}
      </DialogContent>
    </Dialog>
  );
}
