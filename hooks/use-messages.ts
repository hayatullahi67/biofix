"use client";

import { useQuery } from "@tanstack/react-query";
import { messagesApi } from "@/lib/api";
import { useApiMutation } from "./use-api-mutation";
import { useCurrentUser } from "./use-session";

export function useThreads() {
  const user = useCurrentUser();
  const isTechnician = user.role === "technician";
  return useQuery({
    queryKey: ["messages", "threads", user.id],
    queryFn: () => (isTechnician ? messagesApi.listTechnicianThreads(user.id) : messagesApi.listHospitalThreads(user.hospitalId ?? "")),
    refetchInterval: 15_000,
  });
}

export function useMessages(threadId: string | null) {
  return useQuery({
    queryKey: ["messages", "thread", threadId],
    queryFn: () => messagesApi.listMessages(threadId ?? ""),
    enabled: Boolean(threadId),
    refetchInterval: 10_000,
  });
}

export function useSendMessage(threadId: string) {
  const user = useCurrentUser();
  return useApiMutation({
    mutationFn: (body: string) =>
      messagesApi.sendMessage(threadId, { id: user.id, name: user.name, side: user.role === "technician" ? "technician" : "hospital" }, body),
    invalidate: [["messages"], ["notifications"]],
  });
}

export function messageThreadId(jobId: string, technicianId: string): string {
  return messagesApi.threadIdFor(jobId, technicianId);
}
