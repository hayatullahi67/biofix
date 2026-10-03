"use client";

import { MapPinCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMarkArrived } from "@/hooks/use-job-actions";
import type { GeoPoint } from "@/types";

function checkLocation(): Promise<GeoPoint | null> {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => resolve(null),
      { timeout: 4000, maximumAge: 60_000 },
    );
  });
}

export function ArriveAction({ jobId, hospitalName }: { jobId: string; hospitalName: string }) {
  const [checking, setChecking] = useState(false);
  const arrive = useMarkArrived();

  const confirmArrival = async () => {
    setChecking(true);
    const position = await checkLocation();
    setChecking(false);
    toast.info(position ? `Location confirmed near ${hospitalName}` : "Couldn't read your location, so we've recorded a manual check-in");
    arrive.mutate(jobId);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">When you reach {hospitalName}, check in so the hospital knows you&apos;re on site.</p>
      <Button size="lg" className="w-full" onClick={() => void confirmArrival()} loading={checking || arrive.isPending}>
        {!checking && !arrive.isPending ? <MapPinCheck aria-hidden="true" /> : null}
        {checking ? "Checking your location" : "I've arrived"}
      </Button>
    </div>
  );
}
