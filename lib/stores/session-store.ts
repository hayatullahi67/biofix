"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Session, User } from "@/types";

interface SessionState {
  session: Session | null;
  hydrated: boolean;
  setSession: (session: Session) => void;
  updateUser: (user: User) => void;
  clearSession: () => void;
  markHydrated: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      hydrated: false,
      setSession: (session) => set({ session }),
      updateUser: (user) => set((state) => (state.session ? { session: { ...state.session, user } } : state)),
      clearSession: () => set({ session: null }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "biofix:session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);
