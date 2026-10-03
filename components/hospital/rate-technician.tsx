"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/input";
import { StarRating } from "@/components/ui/star-rating";
import { useRateJob } from "@/hooks/use-job-actions";

export function RateTechnician({ jobId, technicianName }: { jobId: string; technicianName: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const rate = useRateJob();
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (rating > 0) rate.mutate({ jobId, rating, comment });
      }}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium">How did {technicianName.split(" ")[0]} do?</p>
        <StarRating value={rating} onChange={setRating} size="lg" label="Rate the technician" />
      </div>
      <Field id="review-comment" label="Review" optional>
        <Textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Arrived on time, explained the fault clearly…" className="min-h-20" />
      </Field>
      <Button type="submit" disabled={rating === 0} loading={rate.isPending}>
        Submit rating
      </Button>
    </form>
  );
}
