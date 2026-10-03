"use client";

import dynamic from "next/dynamic";
import type { UseQueryResult } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MonthlyCount } from "@/types";
import { QueryState } from "../query-state";
import type { TrendChartProps } from "./trend-chart";

const TrendChart = dynamic(() => import("./trend-chart"), { ssr: false, loading: () => <Skeleton className="size-full" /> });

interface ChartCardProps extends Omit<TrendChartProps, "data"> {
  id: string;
  title: string;
  description: string;
  query: UseQueryResult<MonthlyCount[]>;
}

export function ChartCard({ id, title, description, query, ...chart }: ChartCardProps) {
  const format = chart.formatValue ?? String;
  return (
    <Card as="section" aria-labelledby={`${id}-title`} className="flex flex-col gap-4 p-5 sm:p-6">
      <header className="space-y-1">
        <h2 id={`${id}-title`} className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <QueryState query={query} loadingLabel={`Loading ${title.toLowerCase()}`} loading={<Skeleton className="h-64 w-full" />}>
        {(data) => (
          <>
            <figure className="h-64 w-full" aria-label={`${title} chart`}>
              <TrendChart data={data} {...chart} />
            </figure>
            <details className="group text-sm">
              <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">View data as a table</summary>
              <table className="mt-3 w-full text-left text-sm">
                <caption className="sr-only">{title} by month</caption>
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th scope="col" className="py-1 font-medium">Month</th>
                    <th scope="col" className="py-1 text-right font-medium">{chart.seriesLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.month} className="border-t border-border">
                      <th scope="row" className="py-1.5 font-normal">{row.month}</th>
                      <td className="py-1.5 text-right tabular-nums">{format(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        )}
      </QueryState>
    </Card>
  );
}
