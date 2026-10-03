"use client";

import type { Technician, User } from "@/types";
import { useSessionStore } from "@/lib/stores/session-store";

export function useSession() {
  const session = useSessionStore((state) => state.session);
  const hydrated = useSessionStore((state) => state.hydrated);
  return { session, user: session?.user ?? null, hydrated };
}

export function useCurrentUser(): User {
  const user = useSessionStore((state) => state.session?.user);
  if (!user) throw new Error("useCurrentUser must be used inside an authenticated route.");
  return user;
}

export function useHospitalId(): string {
  return useCurrentUser().hospitalId ?? "";
}

export function useTechnicianId(): string {
  const user = useCurrentUser();
  return user.role === "technician" ? user.id : "";
}

export function isTechnician(user: User): user is Technician {
  return user.role === "technician";
}
