"use client";

import { useQuery } from "@tanstack/react-query";
import { techniciansApi } from "@/lib/api";
import { useSessionStore } from "@/lib/stores/session-store";
import type { TechnicianDocument, TechnicianProfileInput, VerificationStatus } from "@/types";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useTechnicianId } from "./use-session";

export function useTechnicians(status?: VerificationStatus) {
  return useQuery({ queryKey: queryKeys.technicians(status), queryFn: () => techniciansApi.listTechnicians(status) });
}

export function useTechnician(id: string) {
  return useQuery({ queryKey: queryKeys.technician(id), queryFn: () => techniciansApi.getTechnician(id), enabled: Boolean(id) });
}

export function useMyTechnicianProfile() {
  return useTechnician(useTechnicianId());
}

export function useReviews(technicianId: string) {
  return useQuery({ queryKey: queryKeys.reviews(technicianId), queryFn: () => techniciansApi.listReviews(technicianId), enabled: Boolean(technicianId) });
}

export function useReviewTechnician(onDone?: () => void) {
  return useApiMutation({
    mutationFn: ({ id, decision, reason }: { id: string; decision: "verified" | "rejected"; reason?: string }) => techniciansApi.reviewTechnician(id, decision, reason),
    invalidate: [["technicians"], ["admin"]],
    successMessage: (tech) => (tech.verificationStatus === "verified" ? `${tech.name} is now verified` : `${tech.name} was rejected`),
    onSuccess: () => onDone?.(),
  });
}

export function useUpdateTechnicianProfile() {
  const technicianId = useTechnicianId();
  const updateUser = useSessionStore((state) => state.updateUser);
  return useApiMutation({
    mutationFn: (input: TechnicianProfileInput) => techniciansApi.updateTechnicianProfile(technicianId, input),
    invalidate: [["technicians"], ["jobs"]],
    successMessage: "Profile saved",
    onSuccess: (technician) => updateUser(technician),
  });
}

export function useUploadTechnicianDocument() {
  const technicianId = useTechnicianId();
  return useApiMutation({
    mutationFn: (document: Omit<TechnicianDocument, "id" | "uploadedAt">) => techniciansApi.uploadTechnicianDocument(technicianId, document),
    invalidate: [["technicians"]],
    successMessage: "Document uploaded for review",
  });
}
