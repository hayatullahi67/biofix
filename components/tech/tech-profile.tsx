"use client";

import { Star } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { QueryState } from "@/components/shared/query-state";
import { ReviewsList } from "@/components/shared/reviews-list";
import { SectionCard } from "@/components/shared/section-card";
import { useMyTechnicianProfile } from "@/hooks/use-technicians";
import { ProfileForm } from "./profile-form";
import { VerificationSection } from "./verification-section";

export function TechProfile() {
  const query = useMyTechnicianProfile();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Profile" title="Your profile" description="Keep your skills and location up to date to see the right jobs." />
      <QueryState query={query} loadingLabel="Loading profile" loading={<ListSkeleton rows={3} className="h-64" />}>
        {(technician) => (
          <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
            <SectionCard id="profile-details" title="Details and skills">
              <ProfileForm technician={technician} />
            </SectionCard>
            <div className="space-y-6">
              <VerificationSection technician={technician} />
              <SectionCard id="ratings-heading" title="Ratings and reviews" description={`${technician.completedJobs} completed jobs`}>
                <p className="mb-4 flex items-center gap-2 text-3xl font-semibold tabular-nums">
                  <Star className="size-6 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {technician.rating ? technician.rating.toFixed(1) : "—"}
                  <span className="text-sm font-normal text-muted-foreground">average rating</span>
                </p>
                <ReviewsList technicianId={technician.id} />
              </SectionCard>
            </div>
          </div>
        )}
      </QueryState>
    </div>
  );
}
