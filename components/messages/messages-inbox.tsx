"use client";

import { MessageSquareText } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { ChatPanel } from "./chat-panel";
import { ThreadList } from "./thread-list";

export function MessagesInbox({ description }: { description: string }) {
  const pathname = usePathname();
  const threadId = useSearchParams().get("thread");
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Messages" title="Messages" description={description} />
      <Card className="grid overflow-hidden md:h-[calc(100dvh-16rem)] md:min-h-[520px] md:grid-cols-[320px_1fr]">
        <aside aria-label="Conversations" className={cn("overflow-y-auto border-border p-2 md:border-r", threadId && "hidden md:block")}>
          <ThreadList basePath={pathname} activeId={threadId} />
        </aside>
        <div className={cn("min-w-0", !threadId && "hidden md:block")}>
          {threadId ? (
            <ChatPanel key={threadId} threadId={threadId} basePath={pathname} />
          ) : (
            <EmptyState icon={MessageSquareText} title="Pick a conversation" description="Choose a conversation on the left to read and reply." className="m-6 border-none" />
          )}
        </div>
      </Card>
    </div>
  );
}
