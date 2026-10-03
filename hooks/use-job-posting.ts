"use client";

import { jobPostingApi } from "@/lib/api";
import type { JobContact } from "@/types";
import { useApiMutation } from "./use-api-mutation";
import { jobKeys } from "./use-job-actions";
import { useCurrentUser, useTechnicianId } from "./use-session";

const keys = [...jobKeys, ["messages"]];

export function usePostJob(onDone?: () => void) {
  const user = useCurrentUser();
  return useApiMutation({
    mutationFn: ({ jobId, contact }: { jobId: string; contact: JobContact }) => jobPostingApi.postJob(jobId, contact, user.id),
    invalidate: keys,
    successMessage: "Job posted. Verified technicians nearby can now apply.",
    onSuccess: () => onDone?.(),
  });
}

export function useApplyToJob(onDone?: () => void) {
  const technicianId = useTechnicianId();
  return useApiMutation({
    mutationFn: ({ jobId, message }: { jobId: string; message: string }) => jobPostingApi.applyToJob(jobId, technicianId, message),
    invalidate: keys,
    successMessage: "Interest sent. The hospital will review and get back to you.",
    onSuccess: () => onDone?.(),
  });
}

export function useAssignTechnician() {
  return useApiMutation({
    mutationFn: ({ jobId, technicianId }: { jobId: string; technicianId: string }) => jobPostingApi.assignTechnician(jobId, technicianId),
    invalidate: keys,
    successMessage: "Technician assigned. They've been notified.",
  });
}
