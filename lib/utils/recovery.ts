const RELOAD_FLAG = "biofix:auto-reloaded";

export function isStaleAssetError(error: unknown): boolean {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|CSS_CHUNK_LOAD_FAILED/i.test(text);
}

export function reloadOnceForStaleAssets(error: unknown): boolean {
  if (typeof window === "undefined" || !isStaleAssetError(error)) return false;
  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return false;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export async function resetDemoData(): Promise<void> {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("biofix:"))
      .forEach((key) => window.localStorage.removeItem(key));
    window.sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // Storage can be unavailable in private mode; continue with the cache cleanup.
  }
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
  window.location.replace(`${window.location.origin}/login`);
}
