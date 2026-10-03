"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyCount } from "@/types";

export interface TrendChartProps {
  data: MonthlyCount[];
  kind: "bar" | "area";
  seriesLabel: string;
  formatValue?: (value: number) => string;
  formatAxis?: (value: number) => string;
}

const axisTick = { fill: "var(--muted-foreground)", fontSize: 12 };

function ChartTooltip({ active, payload, label, seriesLabel, formatValue }: {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string | number;
  seriesLabel: string;
  formatValue: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-[var(--shadow-lift)]">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">
        {seriesLabel}: <span className="font-semibold text-foreground tabular-nums">{formatValue(Number(payload[0]?.value ?? 0))}</span>
      </p>
    </div>
  );
}

export default function TrendChart({ data, kind, seriesLabel, formatValue = String, formatAxis = String }: TrendChartProps) {
  const tooltip = <Tooltip cursor={{ fill: "var(--muted)", stroke: "var(--border)" }} content={<ChartTooltip seriesLabel={seriesLabel} formatValue={formatValue} />} />;
  const grid = <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="0" />;
  const xAxis = <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} dy={8} />;
  const yAxis = <YAxis tickLine={false} axisLine={false} tick={axisTick} width={60} tickFormatter={formatAxis} allowDecimals={false} />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      {kind === "bar" ? (
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="32%">
          {grid}
          {xAxis}
          {yAxis}
          {tooltip}
          <Bar dataKey="value" name={seriesLabel} fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      ) : (
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          {grid}
          {xAxis}
          {yAxis}
          {tooltip}
          <Area dataKey="value" name={seriesLabel} type="monotone" stroke="var(--chart-1)" strokeWidth={2} fill="url(#trend-fill)" activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}
