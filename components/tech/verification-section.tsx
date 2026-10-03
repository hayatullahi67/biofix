"use client";

import { FileCheck2, Upload } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { VerificationBadge } from "@/components/shared/status-badge";
import { useUploadTechnicianDocument } from "@/hooks/use-technicians";
import { formatDate, toIsoString } from "@/lib/utils";
import type { Technician, TechnicianDocument } from "@/types";

const slots: { kind: TechnicianDocument["kind"]; label: string; hint: string }[] = [
  { kind: "certificate", label: "Biomedical certificate", hint: "HND, B.Eng or equivalent certificate" },
  { kind: "government_id", label: "Government ID", hint: "NIN slip, driver's licence or passport" },
];

export function VerificationSection({ technician }: { technician: Technician }) {
  const upload = useUploadTechnicianDocument();
  return (
    <SectionCard id="verification-heading" title="Verification" description="Hospitals only see verified technicians.">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <VerificationBadge status={technician.verificationStatus} />
          {technician.rejectionReason && technician.verificationStatus === "rejected" ? <p className="text-sm text-danger">{technician.rejectionReason}</p> : null}
        </div>
        <ul className="space-y-3">
          {slots.map((slot) => {
            const document = technician.documents.find((doc) => doc.kind === slot.kind);
            const inputId = `upload-${slot.kind}`;
            return (
              <li key={slot.kind} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary"><FileCheck2 className="size-5" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{slot.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {document ? <>{document.name} · <time dateTime={toIsoString(document.uploadedAt)}>{formatDate(document.uploadedAt)}</time></> : slot.hint}
                  </span>
                </span>
                <label htmlFor={inputId} className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
                  <Upload className="size-3.5" aria-hidden="true" />
                  {document ? "Replace" : "Upload"}
                  <input id={inputId} type="file" accept="image/*,application/pdf" className="sr-only" onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) upload.mutate({ kind: slot.kind, name: file.name });
                  }} />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionCard>
  );
}
