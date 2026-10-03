import { format, formatDistanceToNowStrict, isValid, parseISO } from "date-fns";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("en-NG", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatNaira(amount: number): string {
  return nairaFormatter.format(amount);
}

export function formatCompactNaira(amount: number): string {
  return `₦${compactFormatter.format(amount)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

function toDate(value: string | Date): Date | null {
  const date = typeof value === "string" ? parseISO(value) : value;
  return isValid(date) ? date : null;
}

export function formatDate(value: string | Date, pattern = "d MMM yyyy"): string {
  const date = toDate(value);
  return date ? format(date, pattern) : "—";
}

export function formatDateTime(value: string | Date): string {
  return formatDate(value, "d MMM yyyy, h:mm a");
}

export function formatRelative(value: string | Date): string {
  const date = toDate(value);
  return date ? `${formatDistanceToNowStrict(date)} ago` : "—";
}

export function formatDistanceKm(km: number): string {
  return `${km.toFixed(1)} km away`;
}

export function toIsoString(value: string | Date): string {
  const date = toDate(value);
  return date ? date.toISOString() : "";
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
