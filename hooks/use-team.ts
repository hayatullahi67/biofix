"use client";

import { useQuery } from "@tanstack/react-query";
import { invitesApi, teamApi } from "@/lib/api";
import type { InviteInput } from "@/types";
import { queryKeys } from "./query-keys";
import { useApiMutation } from "./use-api-mutation";
import { useHospitalId } from "./use-session";

export function useNurses() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.nurses(hospitalId), queryFn: () => teamApi.listNurses(hospitalId) });
}

export function useInvites() {
  const hospitalId = useHospitalId();
  return useQuery({ queryKey: queryKeys.invites(hospitalId), queryFn: () => teamApi.listInvites(hospitalId) });
}

export function useInviteNurse(onDone?: () => void) {
  const hospitalId = useHospitalId();
  return useApiMutation({
    mutationFn: (input: InviteInput) => teamApi.inviteNurse(hospitalId, input),
    invalidate: [["team"]],
    successMessage: (invite) => `Invite sent to ${invite.name}`,
    onSuccess: () => onDone?.(),
  });
}

export function useResendInvite() {
  return useApiMutation({ mutationFn: teamApi.resendInvite, invalidate: [["team"]], successMessage: "Invite resent" });
}

export function useRevokeInvite() {
  return useApiMutation({ mutationFn: teamApi.revokeInvite, invalidate: [["team"]], successMessage: "Invite cancelled" });
}

export function useRemoveNurse() {
  return useApiMutation({ mutationFn: teamApi.removeNurse, invalidate: [["team"]], successMessage: "Nurse removed from your hospital" });
}

export function useInvite(code: string) {
  return useQuery({ queryKey: queryKeys.invite(code), queryFn: () => invitesApi.getInvite(code), retry: false });
}
