"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useJob } from "@/hooks/use-jobs";
import { useMessages, useSendMessage } from "@/hooks/use-messages";
import { useCurrentUser } from "@/hooks/use-session";
import { useTechnician } from "@/hooks/use-technicians";
import { MessageBubble } from "./message-bubble";

export function ChatPanel({ threadId, basePath }: { threadId: string; basePath: string }) {
  const user = useCurrentUser();
  const [jobId = "", technicianId = ""] = threadId.split("__");
  const job = useJob(jobId);
  const technician = useTechnician(technicianId);
  const messages = useMessages(threadId);
  const send = useSendMessage(threadId);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isTechnician = user.role === "technician";
  const counterpart = isTechnician ? job.data?.hospital.name : technician.data?.name;
  const jobHref = isTechnician ? `/tech/jobs/${jobId}` : user.role === "hospital_admin" ? `/hospital/jobs?job=${jobId}` : undefined;
  const blocked = isTechnician && job.data?.contact?.allowMessages === false;

  useEffect(() => endRef.current?.scrollIntoView({ block: "end" }), [messages.data?.length]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (body) send.mutate(body, { onSuccess: () => setDraft("") });
  };

  return (
    <section aria-label={`Conversation with ${counterpart ?? "contact"}`} className="flex h-full min-h-[60dvh] flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link href={basePath} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted md:hidden" aria-label="Back to conversations">
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">{counterpart ?? "Loading…"}</h2>
          <p className="truncate text-xs text-muted-foreground">{job.data ? `${job.data.machine.name} · ${job.data.hospital.name}` : " "}</p>
        </div>
        {jobHref ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={jobHref}><ExternalLink aria-hidden="true" />View job</Link>
          </Button>
        ) : null}
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        <QueryState query={messages} loading={<ListSkeleton rows={4} className="h-12" />}>
          {(list) =>
            list.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No messages yet. Say hello and ask anything about the job.</p>
            ) : (
              <ol className="space-y-3">{list.map((message) => <MessageBubble key={message.id} message={message} own={isTechnician ? message.senderSide === "technician" : message.senderSide === "hospital"} />)}</ol>
            )
          }
        </QueryState>
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-end gap-2 border-t border-border p-3">
        <label htmlFor="chat-input" className="sr-only">Write a message</label>
        <Textarea
          id="chat-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) submit(event); }}
          placeholder={blocked ? "This hospital prefers phone or email" : "Write a message"}
          disabled={blocked}
          className="min-h-11 flex-1 resize-none sm:h-11"
          rows={1}
        />
        <Button type="submit" size="icon" aria-label="Send message" loading={send.isPending} disabled={blocked || !draft.trim()}>
          {!send.isPending ? <Send aria-hidden="true" /> : null}
        </Button>
      </form>
    </section>
  );
}
