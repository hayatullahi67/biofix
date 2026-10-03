import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = "display" | "xl" | "lg" | "md" | "sm" | "xs";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  size?: HeadingSize;
}

const defaultSize: Record<HeadingLevel, HeadingSize> = { 1: "xl", 2: "lg", 3: "md", 4: "sm" };

const sizeClasses: Record<HeadingSize, string> = {
  display: "font-display text-5xl leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl",
  xl: "text-2xl font-semibold tracking-tight sm:text-3xl",
  lg: "text-xl font-semibold tracking-tight sm:text-2xl",
  md: "text-base font-semibold tracking-tight",
  sm: "text-sm font-semibold",
  xs: "text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground",
};

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn("text-foreground text-balance", sizeClasses[size ?? defaultSize[level]], className)} {...props} />;
}
