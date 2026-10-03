"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ContactFields } from "@/components/shared/contact-fields";
import type { ReportValues } from "@/lib/validation/report";

interface PostNowStepProps {
  register: UseFormRegister<ReportValues>;
  errors: FieldErrors<ReportValues>;
  postNow: boolean;
  alwaysPost: boolean;
}

export function PostNowStep({ register, errors, postNow, alwaysPost }: PostNowStepProps) {
  return (
    <div className="space-y-5">
      {alwaysPost ? (
        <p className="text-sm font-medium">This job will be posted to verified technicians straight away.</p>
      ) : (
        <label htmlFor="post-now" className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3.5 has-[:checked]:border-primary/40 has-[:checked]:bg-accent/50">
          <input id="post-now" type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" {...register("postNow")} />
          <span className="space-y-0.5">
            <span className="block text-sm font-medium">Post this as a job for technicians now</span>
            <span className="block text-xs text-muted-foreground">Post on behalf of your hospital. Leave unticked to let your admin review and post it.</span>
          </span>
        </label>
      )}
      {postNow ? <ContactFields register={register} errors={errors.contact} prefix="contact" idPrefix="report-contact" /> : null}
    </div>
  );
}
