import { absoluteUrl } from "@/lib/seo/site-config";

export function machineUrl(code: string): string {
  return absoluteUrl(`/m/${encodeURIComponent(code)}`);
}

export function parseMachineCode(decoded: string): string | null {
  const text = decoded.trim();
  const match = text.match(/\/m\/([A-Za-z0-9-]+)/);
  if (match?.[1]) return decodeURIComponent(match[1]);
  return /^[A-Za-z]{2,5}-\d{3,5}$/.test(text) ? text.toUpperCase() : null;
}
