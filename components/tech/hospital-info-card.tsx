import { MapPin, Navigation, Phone } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { formatDistanceKm } from "@/lib/utils";
import type { Hospital } from "@/types";

export function HospitalInfoCard({ hospital, distanceKm }: { hospital: Hospital; distanceKm?: number }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
  return (
    <SectionCard id="hospital-info" title={hospital.name} description={distanceKm !== undefined ? formatDistanceKm(distanceKm) : undefined}>
      <div className="space-y-4">
        <figure className="relative h-40 overflow-hidden rounded-xl border border-border bg-[linear-gradient(135deg,var(--accent),var(--muted))]">
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <svg viewBox="0 0 400 160" className="absolute inset-0 size-full text-border" aria-hidden="true" preserveAspectRatio="none">
            <path d="M0 110 C80 90 140 130 220 95 S340 60 400 80" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M120 0 L170 160" stroke="currentColor" strokeWidth="7" fill="none" />
          </svg>
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)]">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <figcaption className="absolute right-2 bottom-2 rounded-md bg-card/90 px-2 py-1 text-[11px] text-muted-foreground">Map preview</figcaption>
        </figure>
        <address className="space-y-2 text-sm not-italic">
          <p>{hospital.address}</p>
          <p><a href={`tel:${hospital.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-primary hover:underline"><Phone className="size-3.5" aria-hidden="true" />{hospital.phone}</a></p>
        </address>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <Navigation className="size-4" aria-hidden="true" />
          Get directions in Google Maps
        </a>
      </div>
    </SectionCard>
  );
}
