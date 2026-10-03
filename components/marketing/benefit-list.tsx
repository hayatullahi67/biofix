import { CircleCheck } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
}

export function BenefitList({ items }: { items: Benefit[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
