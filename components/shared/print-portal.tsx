"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function PrintPortal({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (!mounted) return null;
  return createPortal(<div className="print-root hidden bg-white">{children}</div>, document.body);
}
