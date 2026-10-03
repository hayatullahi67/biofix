import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const gradientId = `biofix-mark-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={cn("size-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />
      <path d="M12 34 H22 L27 21 L35 45 L40 31 H52" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface LogoProps {
  href?: string;
  collapsed?: boolean;
  className?: string;
}

export function Logo({ href = "/", collapsed = false, className }: LogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label="Biofix home">
      <LogoMark />
      {!collapsed ? <span className="text-lg font-semibold tracking-tight text-foreground">Biofix</span> : null}
    </Link>
  );
}
