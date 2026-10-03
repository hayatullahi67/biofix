import { format, startOfMonth, subMonths } from "date-fns";

export interface MonthBucket {
  key: string;
  label: string;
}

export function lastMonths(count: number): MonthBucket[] {
  const start = startOfMonth(new Date());
  return Array.from({ length: count }, (_, index) => {
    const month = subMonths(start, count - 1 - index);
    return { key: format(month, "yyyy-MM"), label: format(month, "MMM") };
  });
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}
