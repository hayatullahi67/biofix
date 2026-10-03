import { Phone } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import type { Technician } from "@/types";
import { VerificationBadge } from "./status-badge";

export function TechnicianCard({ technician }: { technician: Technician }) {
  return (
    <Card as="article" aria-label={`Technician ${technician.name}`} className="flex items-center gap-4 p-4">
      <Avatar name={technician.name} src={technician.avatarUrl} size="lg" />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold">{technician.name}</h3>
          <VerificationBadge status={technician.verificationStatus} />
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <StarRating value={technician.rating} />
          {technician.rating.toFixed(1)} · {technician.completedJobs} jobs · {technician.location.area}
        </p>
      </div>
      <a href={`tel:${technician.phone.replace(/\s/g, "")}`} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-primary hover:bg-accent" aria-label={`Call ${technician.name}`}>
        <Phone className="size-4" aria-hidden="true" />
      </a>
    </Card>
  );
}
