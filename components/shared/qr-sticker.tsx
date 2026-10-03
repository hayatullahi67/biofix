import { QRCodeSVG } from "qrcode.react";
import type { Machine } from "@/types";
import { machineUrl } from "@/lib/utils/qr";
import { LogoMark } from "./logo";

interface QRStickerProps {
  machine: Pick<Machine, "code" | "name" | "ward">;
}

export function QRSticker({ machine }: QRStickerProps) {
  return (
    <article
      aria-label={`QR sticker for ${machine.name}`}
      className="flex w-[62mm] break-inside-avoid flex-col items-center gap-2 rounded-2xl border-2 border-slate-900 bg-white p-4 text-center text-slate-900"
    >
      <header className="flex items-center gap-1.5">
        <LogoMark className="size-5" />
        <span className="text-sm font-semibold tracking-tight">Biofix</span>
      </header>
      <QRCodeSVG value={machineUrl(machine.code)} size={168} level="M" marginSize={1} title={`Open ${machine.name} on Biofix`} />
      <div className="space-y-0.5">
        <p className="text-sm leading-tight font-semibold">{machine.name}</p>
        <p className="text-xs text-slate-600">{machine.ward}</p>
        <p className="font-mono text-[11px] tracking-wider text-slate-500">{machine.code}</p>
      </div>
      <footer className="text-[10px] text-slate-500">Scan to report a fault</footer>
    </article>
  );
}
