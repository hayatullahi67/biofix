"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/lib/stores/session-store";
import { useUiStore } from "@/lib/stores/ui-store";

export function StoreHydrator() {
  useEffect(() => {
    void useSessionStore.persist.rehydrate();
    void useUiStore.persist.rehydrate();
  }, []);
  return null;
}
