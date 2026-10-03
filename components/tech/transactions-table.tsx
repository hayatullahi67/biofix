"use client";

import { Banknote, Landmark, Receipt } from "lucide-react";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useTransactions } from "@/hooks/use-payments";
import { paymentMethodLabels } from "@/lib/domain/job-flow";
import { formatDate, formatNaira, toIsoString } from "@/lib/utils";
import type { EarningTransaction } from "@/types";

const columns: Column<EarningTransaction>[] = [
  {
    key: "description",
    header: "Job",
    cell: (txn) => (
      <span className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success">
          {txn.method === "cash" ? <Banknote className="size-4" aria-hidden="true" /> : <Landmark className="size-4" aria-hidden="true" />}
        </span>
        <span className="block min-w-0 truncate font-medium">{txn.description}</span>
      </span>
    ),
  },
  { key: "date", header: "Date", cell: (txn) => <time dateTime={toIsoString(txn.createdAt)} className="whitespace-nowrap text-muted-foreground">{formatDate(txn.createdAt)}</time> },
  { key: "method", header: "Paid by", cell: (txn) => <Badge tone="neutral">{paymentMethodLabels[txn.method]}</Badge> },
  { key: "amount", header: "Amount", headerClassName: "text-right", className: "text-right font-medium tabular-nums whitespace-nowrap text-success", cell: (txn) => formatNaira(txn.amount) },
];

export function TransactionsTable() {
  const query = useTransactions();
  return (
    <DataTable
      caption="Payments received"
      columns={columns}
      query={query}
      getRowKey={(txn) => txn.id}
      empty={<EmptyState icon={Receipt} title="No payments yet" description="When a hospital pays you for a job and marks it as paid, it shows up here." />}
    />
  );
}
