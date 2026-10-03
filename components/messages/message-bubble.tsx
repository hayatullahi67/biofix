import { cn, formatDateTime, toIsoString } from "@/lib/utils";
import type { Message } from "@/types";

export function MessageBubble({ message, own }: { message: Message; own: boolean }) {
  return (
    <li className={cn("flex", own ? "justify-end" : "justify-start")}>
      <article className={cn("max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-[var(--shadow-soft)]", own ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-card")}>
        {!own ? <p className="mb-0.5 text-xs font-semibold text-primary">{message.senderName}</p> : null}
        <p className="whitespace-pre-wrap leading-relaxed">{message.body}</p>
        <footer className={cn("mt-1 text-[11px]", own ? "text-primary-foreground/75" : "text-muted-foreground")}>
          <time dateTime={toIsoString(message.createdAt)}>{formatDateTime(message.createdAt)}</time>
        </footer>
      </article>
    </li>
  );
}
