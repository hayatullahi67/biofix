"use client";

import { Receipt } from "lucide-react";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading } from "@/components/ui/heading";
import { useBilling } from "@/hooks/use-payments";
import { formatDate, formatNaira, toIsoString } from "@/lib/utils";
import type { BillingRecord } from "@/types";

const columns: Column<BillingRecord>[] = [
  { key: "date", header: "Date", cell: (record) => <time dateTime={toIsoString(record.date)}>{formatDate(record.date)}</time> },
  { key: "description", header: "Description", cell: (record) => <span className="text-muted-foreground">{record.description}</span> },
  { key: "amount", header: "Amount", className: "tabular-nums", cell: (record) => formatNaira(record.amount) },
  { key: "status", header: "Status", cell: (record) => <Badge tone={record.status === "paid" ? "success" : "danger"} dot>{record.status === "paid" ? "Paid" : "Failed"}</Badge> },
];

export function BillingHistory() {
  const query = useBilling();
  return (
    <section aria-labelledby="billing-heading" className="space-y-3">
      <Heading level={2} size="md" id="billing-heading">Billing history</Heading>
      <DataTable
        caption="Billing history"
        columns={columns}
        query={query}
        getRowKey={(record) => record.id}
        empty={<EmptyState icon={Receipt} title="No invoices yet" description="Your subscription invoices will appear here." />}
      />
    </section>
  );
}
