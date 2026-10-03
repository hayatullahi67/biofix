"use client";

import { Banknote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DescriptionList } from "@/components/ui/description-list";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useMarkPaid } from "@/hooks/use-job-actions";
import { formatNaira } from "@/lib/utils";
import type { JobDetails, PaymentMethod } from "@/types";

const methods: { value: PaymentMethod; label: string }[] = [
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "cash", label: "Cash" },
];

export function RecordPayment({ job }: { job: JobDetails }) {
  const [method, setMethod] = useState<PaymentMethod>("bank_transfer");
  const markPaid = useMarkPaid();
  const amount = job.quote?.total ?? job.estimatedPay;
  const bank = job.technician?.bankAccount;

  return (
    <div className="space-y-4">
      <p className="rounded-xl bg-accent/60 p-4 text-sm leading-relaxed">
        Pay <strong className="font-semibold">{job.technician?.name ?? "the technician"}</strong> <strong className="font-semibold tabular-nums">{formatNaira(amount)}</strong> directly, by cash or bank transfer. Biofix does not handle the money; it only keeps the record.
      </p>
      {bank ? (
        <DescriptionList
          columns={3}
          items={[
            { label: "Bank", value: bank.bankName },
            { label: "Account number", value: <span className="font-mono">{bank.accountNumber}</span> },
            { label: "Account name", value: bank.accountName },
          ]}
        />
      ) : null}
      <SegmentedControl name="payment-method" legend="How did you pay?" options={methods} value={method} onChange={setMethod} />
      <Button size="lg" className="w-full" onClick={() => markPaid.mutate({ jobId: job.id, method })} loading={markPaid.isPending}>
        <Banknote aria-hidden="true" />
        Mark as paid
      </Button>
    </div>
  );
}
