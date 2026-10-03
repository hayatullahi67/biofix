"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChipGroup } from "@/components/ui/chip-group";
import { Field, fieldAria } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { useUpdateTechnicianProfile } from "@/hooks/use-technicians";
import { technicianProfileSchema, type TechnicianProfileValues } from "@/lib/validation/technician";
import { technicianSkills, type Technician } from "@/types";
import { AvatarUpload } from "./avatar-upload";

export function ProfileForm({ technician }: { technician: Technician }) {
  const update = useUpdateTechnicianProfile();
  const { control, register, handleSubmit, watch, formState: { errors, isDirty } } = useForm<TechnicianProfileValues>({
    resolver: zodResolver(technicianProfileSchema),
    values: { name: technician.name, phone: technician.phone, area: technician.location.area, city: technician.location.city, bio: technician.bio, skills: technician.skills, avatarUrl: technician.avatarUrl },
  });

  return (
    <form onSubmit={handleSubmit((values) => update.mutate(values))} noValidate className="space-y-6">
      <Controller control={control} name="avatarUrl" render={({ field }) => <AvatarUpload name={watch("name")} value={field.value} onChange={field.onChange} />} />
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Personal details</legend>
        <Field id="tech-name" label="Full name" error={errors.name?.message}>
          <Input {...fieldAria("tech-name", errors.name?.message)} autoComplete="name" {...register("name")} />
        </Field>
        <Field id="tech-phone" label="Phone" error={errors.phone?.message}>
          <Input {...fieldAria("tech-phone", errors.phone?.message)} type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="tech-area" label="Area" error={errors.area?.message}>
          <Input {...fieldAria("tech-area", errors.area?.message)} {...register("area")} />
        </Field>
        <Field id="tech-city" label="City" error={errors.city?.message}>
          <Input {...fieldAria("tech-city", errors.city?.message)} autoComplete="address-level2" {...register("city")} />
        </Field>
        <Field id="tech-bio" label="About you" optional error={errors.bio?.message} className="sm:col-span-2">
          <Textarea {...fieldAria("tech-bio", errors.bio?.message)} className="min-h-20" {...register("bio")} />
        </Field>
      </fieldset>
      <Controller control={control} name="skills" render={({ field }) => (
        <ChipGroup legend="Skills" name="profile-skills" options={technicianSkills} value={field.value} onChange={field.onChange} multiple error={errors.skills?.message} />
      )} />
      <Button type="submit" disabled={!isDirty} loading={update.isPending}>Save profile</Button>
    </form>
  );
}
