import { createSeedDatabase, type MockDatabase } from "@/lib/mock-data";

const STORAGE_KEY = "biofix:mock-db:v2";

let database: MockDatabase | null = null;

function loadFromStorage(): MockDatabase | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockDatabase) : null;
  } catch {
    return null;
  }
}

export function getDb(): MockDatabase {
  database ??= loadFromStorage() ?? createSeedDatabase();
  return database;
}

export function persistDb(): void {
  if (typeof window === "undefined" || !database) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function resetDb(): void {
  database = createSeedDatabase();
  persistDb();
}
