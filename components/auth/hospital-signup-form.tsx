"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignupHospital } from "@/hooks/use-auth";
import { hospitalSignupSchema, type HospitalSignupValues } from "@/lib/validation/auth";
import { PasswordInput } from "./password-input";

export function HospitalSignupForm() {
  const signup = useSignupHospital();
  const { register, handleSubmit, formState: { errors } } = useForm<HospitalSignupValues>({
    resolver: zodResolver(hospitalSignupSchema),
    defaultValues: { hospitalName: "", adminName: "", email: "", phone: "", city: "Lagos", password: "" },
  });

  return (
    <form onSubmit={handleSubmit((values) => signup.mutate(values))} noValidate className="space-y-5">
      <fieldset className="space-y-5">
        <legend className="sr-only">Hospital details</legend>
        <Field id="hospitalName" label="Hospital name" error={errors.hospitalName?.message}>
          <Input {...fieldAria("hospitalName", errors.hospitalName?.message)} autoComplete="organization" placeholder="Grace Specialist Hospital" {...register("hospitalName")} />
        </Field>
        <Field id="city" label="City" error={errors.city?.message}>
          <Input {...fieldAria("city", errors.city?.message)} autoComplete="address-level2" {...register("city")} />
        </Field>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="sr-only">Your details</legend>
        <Field id="adminName" label="Your full name" error={errors.adminName?.message}>
          <Input {...fieldAria("adminName", errors.adminName?.message)} autoComplete="name" {...register("adminName")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="Work email" error={errors.email?.message}>
            <Input {...fieldAria("email", errors.email?.message)} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone?.message}>
            <Input {...fieldAria("phone", errors.phone?.message)} type="tel" autoComplete="tel" placeholder="0803 123 4567" {...register("phone")} />
          </Field>
        </div>
        <Field id="password" label="Password" error={errors.password?.message} hint="At least 8 characters">
          <PasswordInput {...fieldAria("password", errors.password?.message, "At least 8 characters")} autoComplete="new-password" {...register("password")} />
        </Field>
      </fieldset>
      <Button type="submit" size="lg" className="w-full" loading={signup.isPending}>
        Create hospital account
      </Button>
    </form>
  );
}
