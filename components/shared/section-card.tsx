import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  id: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  headingLevel?: 2 | 3;
  className?: string;
  children: React.ReactNode;
}

export function SectionCard({ id, title, description, action, headingLevel = 2, className, children }: SectionCardProps) {
  const HeadingTag = `h${headingLevel}` as const;
  return (
    <Card as="section" aria-labelledby={id} className={cn("flex flex-col", className)}>
      <header className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="space-y-1">
          <HeadingTag id={id} className="text-base font-semibold tracking-tight">{title}</HeadingTag>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {action ? (
          <Link href={action.href} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline">
            {action.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </header>
      <div className="flex-1 p-5 sm:p-6">{children}</div>
    </Card>
  );
}
