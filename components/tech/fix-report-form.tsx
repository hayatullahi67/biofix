"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PhotoUploader } from "@/components/shared/photo-uploader";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { useMarkFixed } from "@/hooks/use-job-actions";
import { fixReportSchema, type FixReportValues } from "@/lib/validation/job";

export function FixReportForm({ jobId }: { jobId: string }) {
  const markFixed = useMarkFixed(jobId);
  const { control, register, handleSubmit, formState: { errors } } = useForm<FixReportValues>({
    resolver: zodResolver(fixReportSchema),
    defaultValues: { beforePhotos: [], afterPhotos: [], notes: "", partsUsed: "" },
  });

  return (
    <form onSubmit={handleSubmit((values) => markFixed.mutate(values))} noValidate className="space-y-6">
      <Controller control={control} name="beforePhotos" render={({ field }) => (
        <PhotoUploader legend="Before photos" value={field.value} onChange={field.onChange} />
      )} />
      <div className="space-y-2">
        <Controller control={control} name="afterPhotos" render={({ field }) => (
          <PhotoUploader legend="After photos" hint="Show the machine working, e.g. the screen after a self-test." value={field.value} onChange={field.onChange} />
        )} />
        {errors.afterPhotos ? <p role="alert" className="text-xs font-medium text-danger">{errors.afterPhotos.message}</p> : null}
      </div>
      <Field id="fix-notes" label="What did you fix?" error={errors.notes?.message}>
        <Textarea {...fieldAria("fix-notes", errors.notes?.message)} placeholder="Replaced the SpO2 module and recalibrated against a reference simulator." {...register("notes")} />
      </Field>
      <Field id="parts-used" label="Parts used" error={errors.partsUsed?.message}>
        <Input {...fieldAria("parts-used", errors.partsUsed?.message)} placeholder="SpO2 module, capacitor kit" {...register("partsUsed")} />
      </Field>
      <Button type="submit" size="lg" className="w-full" loading={markFixed.isPending}>
        <CircleCheck aria-hidden="true" />
        Mark as fixed
      </Button>
    </form>
  );
}
