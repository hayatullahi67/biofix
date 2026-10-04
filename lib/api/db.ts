import { createSeedDatabase, type MockDatabase } from "@/lib/mock-data";

const STORAGE_KEY = "biofix:mock-db:v3";

let database: MockDatabase | null = null;

function isValidDb(value: unknown): value is MockDatabase {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  const seed = createSeedDatabase();
  return (Object.keys(seed) as (keyof MockDatabase)[]).every((key) =>
    Array.isArray(seed[key]) ? Array.isArray(record[key]) : typeof record[key] === "object" && record[key] !== null,
  );
}

function normalize(db: MockDatabase): MockDatabase {
  db.jobs = db.jobs.map((job) => ({ ...job, applications: Array.isArray(job.applications) ? job.applications : [], timeline: Array.isArray(job.timeline) ? job.timeline : [] }));
  db.reports = db.reports.map((report) => ({ ...report, photos: Array.isArray(report.photos) ? report.photos : [] }));
  return db;
}

function loadFromStorage(): MockDatabase | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isValidDb(parsed)) return normalize(parsed);
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
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
