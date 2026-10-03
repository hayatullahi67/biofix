"use client";

import { ArrowDownLeft, ArrowUpRight, Receipt } from "lucide-react";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useTransactions } from "@/hooks/use-payments";
import { cn, formatDate, formatNaira, toIsoString } from "@/lib/utils";
import type { EarningTransaction } from "@/types";

const statusTone = { pending: "warning", available: "success", completed: "neutral" } as const;

const columns: Column<EarningTransaction>[] = [
  {
    key: "description",
    header: "Transaction",
    cell: (txn) => (
      <span className="flex items-center gap-3">
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", txn.type === "job_payment" ? "bg-success-soft text-success" : "bg-muted text-muted-foreground")}>
          {txn.type === "job_payment" ? <ArrowDownLeft className="size-4" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium">{txn.description}</span>
          <span className="block text-xs text-muted-foreground">{txn.type === "job_payment" ? "Job payment" : "Withdrawal"}</span>
        </span>
      </span>
    ),
  },
  { key: "date", header: "Date", cell: (txn) => <time dateTime={toIsoString(txn.createdAt)} className="whitespace-nowrap text-muted-foreground">{formatDate(txn.createdAt)}</time> },
  { key: "status", header: "Status", cell: (txn) => <Badge tone={statusTone[txn.status]} dot>{txn.status[0]?.toUpperCase() + txn.status.slice(1)}</Badge> },
  {
    key: "amount",
    header: "Amount",
    headerClassName: "text-right",
    className: "text-right font-medium tabular-nums whitespace-nowrap",
    cell: (txn) => <span className={txn.type === "job_payment" ? "text-success" : ""}>{txn.type === "job_payment" ? "+" : "−"}{formatNaira(txn.amount)}</span>,
  },
];

export function TransactionsTable() {
  const query = useTransactions();
  return (
    <DataTable
      caption="Transactions"
      columns={columns}
      query={query}
      getRowKey={(txn) => txn.id}
      empty={<EmptyState icon={Receipt} title="No transactions yet" description="Payments for completed jobs and your withdrawals will appear here." />}
    />
  );
}
