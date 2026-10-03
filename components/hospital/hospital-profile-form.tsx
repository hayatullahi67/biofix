"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryState } from "@/components/shared/query-state";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMyHospital, useUpdateHospital } from "@/hooks/use-hospitals";
import { hospitalProfileSchema, type HospitalProfileValues } from "@/lib/validation/hospital";
import type { Hospital } from "@/types";

const fields: { id: keyof HospitalProfileValues; label: string; type?: string; wide?: boolean }[] = [
  { id: "name", label: "Hospital name", wide: true },
  { id: "address", label: "Street address", wide: true },
  { id: "area", label: "Area" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },
  { id: "bedCount", label: "Number of beds", type: "number" },
  { id: "phone", label: "Phone", type: "tel" },
  { id: "email", label: "Email", type: "email" },
];

function ProfileForm({ hospital }: { hospital: Hospital }) {
  const update = useUpdateHospital();
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<HospitalProfileValues>({ resolver: zodResolver(hospitalProfileSchema), values: hospital });
  return (
    <form onSubmit={handleSubmit((values) => update.mutate(values))} noValidate className="space-y-5">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Hospital profile</legend>
        {fields.map((field) => (
          <Field key={field.id} id={`profile-${field.id}`} label={field.label} error={errors[field.id]?.message} className={field.wide ? "sm:col-span-2" : undefined}>
            <Input type={field.type ?? "text"} {...fieldAria(`profile-${field.id}`, errors[field.id]?.message)} {...register(field.id, field.type === "number" ? { valueAsNumber: true } : undefined)} />
          </Field>
        ))}
      </fieldset>
      <Button type="submit" disabled={!isDirty} loading={update.isPending}>Save changes</Button>
    </form>
  );
}

export function HospitalProfileForm() {
  const query = useMyHospital();
  return (
    <SectionCard id="profile-heading" title="Hospital profile" description="Shown to technicians when they accept your jobs.">
      <QueryState query={query} loading={<ListSkeleton rows={4} />}>
        {(hospital) => <ProfileForm hospital={hospital} />}
      </QueryState>
    </SectionCard>
  );
}
