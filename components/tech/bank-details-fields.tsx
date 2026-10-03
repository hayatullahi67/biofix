"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TechnicianProfileValues } from "@/lib/validation/technician";

interface BankDetailsFieldsProps {
  register: UseFormRegister<TechnicianProfileValues>;
  errors: FieldErrors<TechnicianProfileValues>;
}

export function BankDetailsFields({ register, errors }: BankDetailsFieldsProps) {
  const bankErrors = errors.bankAccount;
  return (
    <fieldset className="grid gap-4 sm:grid-cols-3">
      <legend className="mb-1 text-sm font-medium">Bank details</legend>
      <p className="-mt-1 text-xs text-muted-foreground sm:col-span-3">Shown to hospitals when they pay you by bank transfer.</p>
      <Field id="bank-name" label="Bank" error={bankErrors?.bankName?.message}>
        <Input {...fieldAria("bank-name", bankErrors?.bankName?.message)} placeholder="GTBank" {...register("bankAccount.bankName")} />
      </Field>
      <Field id="bank-account-number" label="Account number" error={bankErrors?.accountNumber?.message}>
        <Input {...fieldAria("bank-account-number", bankErrors?.accountNumber?.message)} inputMode="numeric" maxLength={10} {...register("bankAccount.accountNumber")} />
      </Field>
      <Field id="bank-account-name" label="Account name" error={bankErrors?.accountName?.message}>
        <Input {...fieldAria("bank-account-name", bankErrors?.accountName?.message)} {...register("bankAccount.accountName")} />
      </Field>
    </fieldset>
  );
}
