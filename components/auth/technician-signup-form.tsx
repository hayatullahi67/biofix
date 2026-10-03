"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChipGroup } from "@/components/ui/chip-group";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignupTechnician } from "@/hooks/use-auth";
import { technicianSignupSchema, type TechnicianSignupValues } from "@/lib/validation/auth";
import { technicianSkills } from "@/types";
import { PasswordInput } from "./password-input";

export function TechnicianSignupForm() {
  const signup = useSignupTechnician();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TechnicianSignupValues>({
    resolver: zodResolver(technicianSignupSchema),
    defaultValues: { name: "", email: "", phone: "", city: "Lagos", skills: [], password: "" },
  });

  return (
    <form onSubmit={handleSubmit((values) => signup.mutate(values))} noValidate className="space-y-5">
      <Field id="name" label="Full name" error={errors.name?.message}>
        <Input {...fieldAria("name", errors.name?.message)} autoComplete="name" {...register("name")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input {...fieldAria("email", errors.email?.message)} type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input {...fieldAria("phone", errors.phone?.message)} type="tel" autoComplete="tel" placeholder="0803 123 4567" {...register("phone")} />
        </Field>
      </div>
      <Field id="city" label="City you work in" error={errors.city?.message}>
        <Input {...fieldAria("city", errors.city?.message)} autoComplete="address-level2" {...register("city")} />
      </Field>
      <Controller
        control={control}
        name="skills"
        render={({ field }) => (
          <ChipGroup legend="Equipment you can repair" name="skills" options={technicianSkills} value={field.value} onChange={field.onChange} multiple error={errors.skills?.message} />
        )}
      />
      <Field id="password" label="Password" error={errors.password?.message} hint="At least 8 characters">
        <PasswordInput {...fieldAria("password", errors.password?.message, "At least 8 characters")} autoComplete="new-password" {...register("password")} />
      </Field>
      <Button type="submit" size="lg" className="w-full" loading={signup.isPending}>
        Create technician account
      </Button>
      <p className="text-center text-xs text-muted-foreground">You&apos;ll upload your certificate and ID next so our team can verify you.</p>
    </form>
  );
}
