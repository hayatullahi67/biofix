import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 ? <ChevronRight className="size-3.5" aria-hidden="true" /> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">{item.label}</Link>
            ) : (
              <span aria-current="page" className="truncate font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
