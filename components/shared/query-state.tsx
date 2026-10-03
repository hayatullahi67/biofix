"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingRegion } from "@/components/ui/skeleton";

interface QueryStateProps<T> {
  query: UseQueryResult<T>;
  loading: React.ReactNode;
  loadingLabel?: string;
  empty?: React.ReactNode;
  isEmpty?: (data: T) => boolean;
  children: (data: T) => React.ReactNode;
}

export function QueryState<T>({ query, loading, loadingLabel = "Loading", empty, isEmpty, children }: QueryStateProps<T>) {
  if (query.isPending) return <LoadingRegion label={loadingLabel}>{loading}</LoadingRegion>;
  if (query.isError) return <ErrorState message={query.error.message} onRetry={() => void query.refetch()} />;
  if (empty && isEmpty?.(query.data)) return <>{empty}</>;
  return <>{children(query.data)}</>;
}

export const isEmptyArray = <T,>(data: T[]): boolean => data.length === 0;
