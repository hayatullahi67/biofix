"use client";

import { RefreshCw, WifiOff } from "lucide-react";
import { Button } from "./button";
import { EmptyState } from "./empty-state";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ message, onRetry, className }: ErrorStateProps) {
  return (
    <div role="alert">
      <EmptyState
        icon={WifiOff}
        tone="danger"
        title="Couldn't load this"
        description={message ?? "Something went wrong while loading. Please try again."}
        className={className}
        action={
          onRetry ? (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw aria-hidden="true" />
              Try again
            </Button>
          ) : null
        }
      />
    </div>
  );
}
