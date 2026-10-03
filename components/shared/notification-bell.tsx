"use client";

import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarkNotificationsRead, useNotifications } from "@/hooks/use-notifications";
import { cn, formatRelative, toIsoString } from "@/lib/utils";

export function NotificationBell() {
  const query = useNotifications();
  const markRead = useMarkNotificationsRead();
  const unread = query.data?.filter((notification) => !notification.read).length ?? 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}>
          <Bell className="size-[18px]" aria-hidden="true" />
          {unread ? <span className="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-background" aria-hidden="true" /> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(92vw,380px)] p-0">
        <section aria-labelledby="notifications-heading">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 id="notifications-heading" className="text-sm font-semibold">Notifications</h2>
            <Button variant="ghost" size="sm" onClick={() => markRead.mutate()} disabled={!unread} loading={markRead.isPending}>
              <CheckCheck aria-hidden="true" />
              Mark all read
            </Button>
          </header>
          {query.isPending ? (
            <div className="space-y-3 p-4">{[0, 1, 2].map((key) => <Skeleton key={key} className="h-12" />)}</div>
          ) : query.isError ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Couldn&apos;t load notifications.</p>
          ) : query.data.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">You&apos;re all caught up.</p>
          ) : (
            <ul className="max-h-96 divide-y divide-border overflow-y-auto">
              {query.data.map((notification) => (
                <li key={notification.id}>
                  <Link href={notification.href ?? "#"} className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60">
                    <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", notification.read ? "bg-transparent" : "bg-primary")} aria-hidden="true" />
                    <span className="min-w-0 space-y-0.5">
                      <span className="block text-sm font-medium">{notification.title}</span>
                      <span className="block text-sm text-muted-foreground">{notification.body}</span>
                      <time dateTime={toIsoString(notification.createdAt)} className="block text-xs text-muted-foreground">
                        {formatRelative(notification.createdAt)}
                      </time>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </PopoverContent>
    </Popover>
  );
}
