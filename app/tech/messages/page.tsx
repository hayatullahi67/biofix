import type { Metadata } from "next";
import { Suspense } from "react";
import { MessagesInbox } from "@/components/messages/messages-inbox";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesInbox description="Talk to hospitals about jobs you&apos;re interested in or working on." />
    </Suspense>
  );
}
