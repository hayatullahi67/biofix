import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

interface MarketingSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
}

export function MarketingSection({ id, eyebrow, title, intro, align = "center", className, children }: MarketingSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <header className={cn("mb-12 max-w-2xl space-y-4 sm:mb-16", align === "center" && "mx-auto text-center")}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
          <Heading level={2} id={`${id}-heading`} className="font-display text-4xl font-normal tracking-[-0.01em] sm:text-5xl">
            {title}
          </Heading>
          {intro ? <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
