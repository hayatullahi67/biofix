"use client";

import { MessageSquare } from "lucide-react";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ContactValues } from "@/lib/validation/job-posting";

interface ContactFieldsProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors<ContactValues>;
  prefix: string;
  idPrefix: string;
}

export function ContactFields<T extends FieldValues>({ register, errors, prefix, idPrefix }: ContactFieldsProps<T>) {
  const path = (key: keyof ContactValues) => `${prefix}.${key}` as Path<T>;
  const id = (key: string) => `${idPrefix}-${key}`;
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium">How can technicians reach you?</legend>
      <p className="-mt-2 text-xs text-muted-foreground">Shown only to verified technicians looking at this job.</p>
      <Field id={id("name")} label="Contact person" error={errors?.name?.message}>
        <Input {...fieldAria(id("name"), errors?.name?.message)} autoComplete="name" {...register(path("name"))} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("phone")} label="Phone" optional error={errors?.phone?.message}>
          <Input {...fieldAria(id("phone"), errors?.phone?.message)} type="tel" autoComplete="tel" placeholder="0803 123 4567" {...register(path("phone"))} />
        </Field>
        <Field id={id("email")} label="Email" optional error={errors?.email?.message}>
          <Input {...fieldAria(id("email"), errors?.email?.message)} type="email" autoComplete="email" {...register(path("email"))} />
        </Field>
      </div>
      <label htmlFor={id("messages")} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3.5 has-[:checked]:border-primary/40 has-[:checked]:bg-accent/50">
        <input id={id("messages")} type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" {...register(path("allowMessages"))} />
        <span className="space-y-0.5">
          <span className="flex items-center gap-1.5 text-sm font-medium"><MessageSquare className="size-4 text-primary" aria-hidden="true" />Allow in-app messages</span>
          <span className="block text-xs text-muted-foreground">Technicians can chat with your hospital inside Biofix.</span>
        </span>
      </label>
      {errors?.allowMessages ? <p role="alert" className="text-xs font-medium text-danger">{errors.allowMessages.message}</p> : null}
    </fieldset>
  );
}
