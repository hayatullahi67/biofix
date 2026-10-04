"use client";

import { useEffect } from "react";

export function ServiceWorkerUpdater() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !navigator.serviceWorker.controller) return;
    let reloaded = false;
    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    void navigator.serviceWorker.getRegistration().then((registration) => registration?.update());
    return () => navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
  }, []);
  return null;
}
