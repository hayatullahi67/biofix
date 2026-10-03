"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { QueryState } from "./query-state";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  caption: string;
  columns: Column<T>[];
  query: UseQueryResult<T[]>;
  getRowKey: (row: T) => string;
  empty: React.ReactNode;
  mobileCard?: (row: T) => React.ReactNode;
  filter?: (rows: T[]) => T[];
}

function TableSkeleton({ columns }: { columns: number }) {
  return (
    <Card className="divide-y divide-border overflow-hidden">
      {Array.from({ length: 6 }, (_, row) => (
        <div key={row} className="flex items-center gap-4 px-5 py-4">
          {Array.from({ length: Math.min(columns, 5) }, (_, col) => (
            <Skeleton key={col} className={cn("h-4", col === 0 ? "w-40" : "w-20 flex-1")} />
          ))}
        </div>
      ))}
    </Card>
  );
}

export function DataTable<T>({ caption, columns, query, getRowKey, empty, mobileCard, filter }: DataTableProps<T>) {
  return (
    <QueryState
      query={query}
      loadingLabel={`Loading ${caption.toLowerCase()}`}
      loading={<TableSkeleton columns={columns.length} />}
      empty={empty}
      isEmpty={(rows) => (filter ? filter(rows) : rows).length === 0}
    >
      {(data) => {
        const rows = filter ? filter(data) : data;
        return (
          <>
            {mobileCard ? <ul className="space-y-3 md:hidden">{rows.map((row) => <li key={getRowKey(row)}>{mobileCard(row)}</li>)}</ul> : null}
            <Card className={cn("overflow-hidden", mobileCard && "hidden md:block")}>
              <Table>
                <TableCaption>{caption}</TableCaption>
                <TableHeader>
                  <tr>
                    {columns.map((column) => (
                      <TableHead key={column.key} className={column.headerClassName}>
                        {column.header}
                      </TableHead>
                    ))}
                  </tr>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={getRowKey(row)}>
                      {columns.map((column) => (
                        <TableCell key={column.key} className={column.className}>
                          {column.cell(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        );
      }}
    </QueryState>
  );
}
