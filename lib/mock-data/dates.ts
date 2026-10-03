const DAY_MS = 86_400_000;

export function daysAgo(days: number, hour = 9): string {
  const date = new Date(Date.now() - days * DAY_MS);
  date.setHours(hour, (days * 7) % 60, 0, 0);
  return date.toISOString();
}

export function daysAhead(days: number): string {
  return daysAgo(-days);
}

export function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}
