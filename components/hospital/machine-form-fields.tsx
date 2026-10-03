"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { PhotoUploader } from "@/components/shared/photo-uploader";
import { Field, fieldAria } from "@/components/ui/field";
import { Input, NativeSelect } from "@/components/ui/input";
import type { MachineFormValues } from "@/lib/validation/machine";
import { machineTypes } from "@/types";

interface MachineFormFieldsProps {
  register: UseFormRegister<MachineFormValues>;
  control: Control<MachineFormValues>;
  errors: FieldErrors<MachineFormValues>;
}

const intervals = [1, 3, 6, 12, 24];

export function MachineFormFields({ register, control, errors }: MachineFormFieldsProps) {
  const text = (id: keyof MachineFormValues, label: string, placeholder?: string) => (
    <Field id={id} label={label} error={errors[id]?.message}>
      <Input {...fieldAria(id, errors[id]?.message)} placeholder={placeholder} {...register(id)} />
    </Field>
  );

  return (
    <div className="space-y-6">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-semibold">Machine</legend>
        {text("name", "Machine name", "ICU Ventilator 3")}
        <Field id="type" label="Type" error={errors.type?.message}>
          <NativeSelect {...fieldAria("type", errors.type?.message)} {...register("type")}>
            <option value="">Select type</option>
            {machineTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </NativeSelect>
        </Field>
        {text("brand", "Brand", "Philips")}
        {text("model", "Model", "IntelliVue MX450")}
        {text("serialNumber", "Serial number", "PHI4839201")}
        {text("ward", "Ward", "ICU")}
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-3">
        <legend className="mb-3 text-sm font-semibold">Warranty and service</legend>
        <Field id="purchaseDate" label="Purchase date" error={errors.purchaseDate?.message}>
          <Input type="date" {...fieldAria("purchaseDate", errors.purchaseDate?.message)} {...register("purchaseDate")} />
        </Field>
        <Field id="warrantyEnd" label="Warranty ends" error={errors.warrantyEnd?.message}>
          <Input type="date" {...fieldAria("warrantyEnd", errors.warrantyEnd?.message)} {...register("warrantyEnd")} />
        </Field>
        <Field id="serviceIntervalMonths" label="Service every" error={errors.serviceIntervalMonths?.message}>
          <NativeSelect {...fieldAria("serviceIntervalMonths")} {...register("serviceIntervalMonths", { valueAsNumber: true })}>
            {intervals.map((months) => <option key={months} value={months}>{months} month{months > 1 ? "s" : ""}</option>)}
          </NativeSelect>
        </Field>
      </fieldset>
      <Controller
        control={control}
        name="photoUrl"
        render={({ field }) => (
          <PhotoUploader legend="Photo" hint="Optional. Helps nurses find the right machine." max={1} value={field.value ? [field.value] : []} onChange={(photos) => field.onChange(photos[0])} />
        )}
      />
    </div>
  );
}
