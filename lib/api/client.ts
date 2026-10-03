import type { MockDatabase } from "@/lib/mock-data";
import { getDb, persistDb } from "./db";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const errorRate = Number(process.env.NEXT_PUBLIC_MOCK_ERROR_RATE ?? "0.03");

function networkDelay(): Promise<void> {
  const ms = 300 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function query<T>(resolver: (db: MockDatabase) => T): Promise<T> {
  await networkDelay();
  if (Math.random() < errorRate) {
    throw new ApiError("We couldn't reach Biofix. Check your connection and try again.", 503);
  }
  return structuredClone(resolver(getDb()));
}

export async function mutate<T>(resolver: (db: MockDatabase) => T): Promise<T> {
  await networkDelay();
  const result = resolver(getDb());
  persistDb();
  return structuredClone(result);
}

export function notFound(entity: string): never {
  throw new ApiError(`${entity} not found.`, 404);
}

export function findOrThrow<T extends { id: string }>(items: T[], id: string, entity: string): T {
  return items.find((item) => item.id === id) ?? notFound(entity);
}
