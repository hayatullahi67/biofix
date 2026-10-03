"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizes = { sm: "size-3.5", md: "size-5", lg: "size-8" };

export function StarRating({ value, onChange, size = "sm", label = "Rating" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  if (!onChange) {
    return (
      <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
        {stars.map((star) => (
          <Star key={star} aria-hidden="true" className={cn(sizes[size], star <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
        ))}
      </span>
    );
  }
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="flex items-center gap-1">
        {stars.map((star) => (
          <label key={star} className="cursor-pointer rounded-md p-0.5 transition-transform hover:scale-110 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
            <input type="radio" name={label} value={star} checked={value === star} onChange={() => onChange(star)} className="sr-only" />
            <span className="sr-only">{star} star{star > 1 ? "s" : ""}</span>
            <Star aria-hidden="true" className={cn(sizes[size], star <= value ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/40")} />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
