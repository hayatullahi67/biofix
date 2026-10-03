"use client";

import { MessageSquareQuote } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { StarRating } from "@/components/ui/star-rating";
import { useReviews } from "@/hooks/use-technicians";
import { formatDate, toIsoString } from "@/lib/utils";
import { ListSkeleton } from "./list-skeleton";
import { isEmptyArray, QueryState } from "./query-state";

export function ReviewsList({ technicianId }: { technicianId: string }) {
  const query = useReviews(technicianId);
  return (
    <QueryState query={query} loading={<ListSkeleton rows={3} className="h-24" />} isEmpty={isEmptyArray} empty={<EmptyState icon={MessageSquareQuote} title="No reviews yet" description="Hospitals rate you after each confirmed repair." />}>
      {(reviews) => (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <article className="space-y-2 rounded-xl border border-border p-4">
                <header className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-medium">{review.hospitalName}</h3>
                  <StarRating value={review.rating} />
                </header>
                {review.comment ? <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{review.comment}&rdquo;</p> : null}
                <footer className="text-xs text-muted-foreground"><time dateTime={toIsoString(review.createdAt)}>{formatDate(review.createdAt)}</time></footer>
              </article>
            </li>
          ))}
        </ul>
      )}
    </QueryState>
  );
}
