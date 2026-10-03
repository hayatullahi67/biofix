"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { MachineCombobox } from "@/components/shared/machine-combobox";
import { PhotoUploader } from "@/components/shared/photo-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChipGroup } from "@/components/ui/chip-group";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useCreateReport } from "@/hooks/use-job-actions";
import { useCurrentUser } from "@/hooks/use-session";
import { reportSchema, type ReportValues } from "@/lib/validation/report";
import { faultCategories, type CreatedReport, type Machine, type Urgency } from "@/types";

const urgencyOptions: { value: Urgency; label: string; tone: "neutral" | "warning" | "danger" }[] = [
  { value: "low", label: "Low", tone: "neutral" },
  { value: "medium", label: "Medium", tone: "warning" },
  { value: "critical", label: "Critical", tone: "danger" },
];

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <Card as="li" className="flex gap-4 p-5 sm:p-6">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground" aria-hidden="true">{number}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </Card>
  );
}

interface ReportFaultFormProps {
  machines: Machine[];
  initialMachineId: string;
  onCreated: (created: CreatedReport, machine: Machine) => void;
}

export function ReportFaultForm({ machines, initialMachineId, onCreated }: ReportFaultFormProps) {
  const user = useCurrentUser();
  const create = useCreateReport();
  const { control, register, handleSubmit, formState: { errors } } = useForm<ReportValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: { machineId: initialMachineId, photos: [], description: "", urgency: "medium" },
  });

  const submit = handleSubmit((values) =>
    create.mutate({ ...values, reportedBy: user.id }, { onSuccess: (created) => onCreated(created, machines.find((machine) => machine.id === values.machineId) ?? machines[0]) }),
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <ol className="space-y-4">
        <Step number={1}>
          <Controller control={control} name="machineId" render={({ field }) => (
            <Field id="machine" label="Which machine is broken?" error={errors.machineId?.message}>
              <MachineCombobox id="machine" machines={machines} value={field.value} onChange={field.onChange} invalid={Boolean(errors.machineId)} describedBy={errors.machineId ? "machine-error" : undefined} />
            </Field>
          )} />
        </Step>
        <Step number={2}>
          <Controller control={control} name="photos" render={({ field }) => (
            <PhotoUploader legend="Add a photo of the fault" hint="A clear photo of the screen or damage helps the technician come prepared." value={field.value} onChange={field.onChange} />
          )} />
        </Step>
        <Step number={3}>
          <Controller control={control} name="category" render={({ field }) => (
            <ChipGroup legend="What's wrong?" name="category" options={faultCategories} value={field.value ? [field.value] : []} onChange={(value) => field.onChange(value[0])} error={errors.category?.message} />
          )} />
        </Step>
        <Step number={4}>
          <Field id="description" label="Describe the problem" error={errors.description?.message}>
            <Textarea id="description" aria-invalid={errors.description ? true : undefined} aria-describedby={errors.description ? "description-error" : undefined} placeholder="What happened? Any error code on the screen?" {...register("description")} />
          </Field>
        </Step>
        <Step number={5}>
          <Controller control={control} name="urgency" render={({ field }) => (
            <SegmentedControl name="urgency" legend="How urgent is it?" options={urgencyOptions} value={field.value} onChange={field.onChange} />
          )} />
        </Step>
      </ol>
      <div className="glass sticky bottom-20 z-10 -mx-4 border-t border-border px-4 py-3 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <Button type="submit" size="lg" className="w-full" loading={create.isPending}>
          <Send aria-hidden="true" />
          Send report
        </Button>
      </div>
    </form>
  );
}
