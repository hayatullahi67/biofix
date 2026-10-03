"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi, invitesApi } from "@/lib/api";
import { isSafeRedirect, roleHome } from "@/lib/domain/roles";
import { useSessionStore } from "@/lib/stores/session-store";
import type { AcceptInviteInput, Session } from "@/types";
import { useApiMutation } from "./use-api-mutation";

function useCompleteLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useSessionStore((state) => state.setSession);
  return (session: Session) => {
    setSession(session);
    const next = searchParams.get("next");
    router.replace(isSafeRedirect(next) ? next : roleHome[session.user.role]);
  };
}

export function useLogin() {
  const complete = useCompleteLogin();
  return useApiMutation({ mutationFn: authApi.login, onSuccess: complete, successMessage: (session) => `Welcome back, ${session.user.name.split(" ")[0]}` });
}

export function useDemoLogin() {
  const complete = useCompleteLogin();
  return useApiMutation({ mutationFn: authApi.loginAsDemo, onSuccess: complete, successMessage: (session) => `Signed in as ${session.user.name}` });
}

export function useSignupHospital() {
  const complete = useCompleteLogin();
  return useApiMutation({ mutationFn: authApi.signupHospital, onSuccess: complete, successMessage: "Your hospital workspace is ready" });
}

export function useSignupTechnician() {
  const complete = useCompleteLogin();
  return useApiMutation({ mutationFn: authApi.signupTechnician, onSuccess: complete, successMessage: "Account created. Upload your documents to get verified." });
}

export function useAcceptInvite(code: string) {
  const complete = useCompleteLogin();
  return useApiMutation({
    mutationFn: (input: AcceptInviteInput) => invitesApi.acceptInvite(code, input),
    onSuccess: complete,
    successMessage: "Welcome to your hospital on Biofix",
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearSession = useSessionStore((state) => state.clearSession);
  return () => {
    clearSession();
    queryClient.clear();
    router.replace("/login");
  };
}
