"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UiState {
  sidebarCollapsed: boolean;
  installDismissed: boolean;
  toggleSidebar: () => void;
  dismissInstall: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      installDismissed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      dismissInstall: () => set({ installDismissed: true }),
    }),
    { name: "biofix:ui", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
