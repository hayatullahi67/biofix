"use client";

import { Printer } from "lucide-react";
import { PrintPortal } from "@/components/shared/print-portal";
import { QRSticker } from "@/components/shared/qr-sticker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Machine } from "@/types";

interface PrintStickersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  machines: Machine[];
  title: string;
}

function StickerGrid({ machines }: { machines: Machine[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-4 print:justify-start" aria-label="Stickers to print">
      {machines.map((machine) => (
        <li key={machine.id}>
          <QRSticker machine={machine} />
        </li>
      ))}
    </ul>
  );
}

export function PrintStickersDialog({ open, onOpenChange, machines, title }: PrintStickersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={title} description="Print on sticker paper and attach to the front of each machine." size="lg">
        <div className="space-y-5">
          <div className="max-h-[55dvh] overflow-y-auto rounded-xl bg-muted p-4">
            <StickerGrid machines={machines} />
          </div>
          <Button className="w-full" size="lg" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            Print {machines.length} sticker{machines.length === 1 ? "" : "s"}
          </Button>
        </div>
        {open ? (
          <PrintPortal>
            <StickerGrid machines={machines} />
          </PrintPortal>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
