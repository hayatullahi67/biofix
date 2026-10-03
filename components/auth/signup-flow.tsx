"use client";

import Link from "next/link";
import { Building2, Wrench } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { HospitalSignupForm } from "./hospital-signup-form";
import { TechnicianSignupForm } from "./technician-signup-form";

type AccountType = "hospital" | "technician";

const choices = [
  { value: "hospital", title: "I'm a Hospital", description: "Track equipment and hire technicians", icon: Building2 },
  { value: "technician", title: "I'm a Technician", description: "Find repair jobs near you", icon: Wrench },
] as const;

export function SignupFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("type");
  const type: AccountType = param === "technician" ? "technician" : "hospital";

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Choose your account type</legend>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <label key={choice.value} className="cursor-pointer">
              <input
                type="radio"
                name="account-type"
                value={choice.value}
                checked={type === choice.value}
                onChange={() => router.replace(`/signup?type=${choice.value}`, { scroll: false })}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-full flex-col gap-3 rounded-2xl border bg-card p-4 shadow-[var(--shadow-soft)] transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  type === choice.value ? "border-primary ring-1 ring-primary/30" : "border-border hover:border-primary/30",
                )}
              >
                <choice.icon className={cn("size-5", type === choice.value ? "text-primary" : "text-muted-foreground")} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">{choice.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{choice.description}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {type === "hospital" ? <HospitalSignupForm /> : <TechnicianSignupForm />}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">Nurses join through an invite link from their hospital admin.</p>
    </div>
  );
}
