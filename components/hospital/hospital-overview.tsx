"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { ChartCard } from "@/components/shared/charts/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { useFaultsPerMonth } from "@/hooks/use-hospital-stats";
import { useCurrentUser } from "@/hooks/use-session";
import { DueServiceList } from "./due-service-list";
import { HospitalStatCards } from "./hospital-stat-cards";
import { OpenJobsList } from "./open-jobs-list";

function greeting(): string {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

export function HospitalOverview() {
  const user = useCurrentUser();
  const faults = useFaultsPerMonth();
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Overview"
        title={`${greeting()}, ${user.name.split(" ")[0]}`}
        description="Here's how your hospital's equipment is doing today."
        actions={
          <Button asChild>
            <Link href="/hospital/equipment?add=1">
              <Plus aria-hidden="true" />
              Add machine
            </Link>
          </Button>
        }
      />
      <HospitalStatCards />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ChartCard id="faults-chart" title="Faults per month" description="Fault reports across all wards, last 6 months" query={faults} kind="bar" seriesLabel="Faults" />
        <OpenJobsList />
      </div>
      <DueServiceList />
    </div>
  );
}
