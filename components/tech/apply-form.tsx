"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Textarea } from "@/components/ui/input";
import { useApplyToJob } from "@/hooks/use-job-posting";
import { formatNaira } from "@/lib/utils";
import { applySchema, type ApplyValues } from "@/lib/validation/job-posting";
import type { JobDetails } from "@/types";

export function ApplyForm({ job }: { job: JobDetails }) {
  const apply = useApplyToJob();
  const { register, handleSubmit, formState: { errors } } = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues: { message: `Hello, I can repair the ${job.machine.name}. I'm available today and can share a quote after inspection.` },
  });
  return (
    <form onSubmit={handleSubmit((values) => apply.mutate({ jobId: job.id, message: values.message }))} noValidate className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Estimated pay {formatNaira(job.estimatedPay)}. Tell the hospital why you&apos;re a good fit; they choose who gets the job.
      </p>
      <Field id="apply-message" label="Message to the hospital" error={errors.message?.message}>
        <Textarea {...fieldAria("apply-message", errors.message?.message)} className="min-h-24" {...register("message")} />
      </Field>
      <Button type="submit" size="lg" className="w-full" loading={apply.isPending}>
        <Send aria-hidden="true" />
        I&apos;m interested
      </Button>
    </form>
  );
}
