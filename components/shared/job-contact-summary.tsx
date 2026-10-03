import { Mail, MessageSquare, Phone, UserRound } from "lucide-react";
import type { JobContact } from "@/types";

export function JobContactSummary({ contact, linkable = false }: { contact: JobContact; linkable?: boolean }) {
  const rows = [
    { icon: UserRound, label: contact.name, href: undefined },
    contact.phone ? { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/[\s-]/g, "")}` } : null,
    contact.email ? { icon: Mail, label: contact.email, href: `mailto:${contact.email}` } : null,
    { icon: MessageSquare, label: contact.allowMessages ? "In-app messages welcome" : "No in-app messages", href: undefined },
  ].filter((row) => row !== null);
  return (
    <address className="not-italic">
      <ul className="space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-2.5">
            <row.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {linkable && row.href ? (
              <a href={row.href} className="font-medium text-primary hover:underline">{row.label}</a>
            ) : (
              <span>{row.label}</span>
            )}
          </li>
        ))}
      </ul>
    </address>
  );
}
