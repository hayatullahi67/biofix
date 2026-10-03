"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "@/lib/api";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useCurrentUser } from "./use-session";

export function useNotifications() {
  const user = useCurrentUser();
  return useQuery({ queryKey: queryKeys.notifications(user.id), queryFn: () => notificationsApi.listNotifications(user.id), refetchInterval: 60_000 });
}

export function useMarkNotificationsRead() {
  const user = useCurrentUser();
  return useApiMutation({ mutationFn: () => notificationsApi.markAllNotificationsRead(user.id), invalidate: [["notifications"]] });
}
