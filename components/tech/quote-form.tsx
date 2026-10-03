"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Send, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { useSendQuote } from "@/hooks/use-job-actions";
import { formatNaira } from "@/lib/utils";
import { quoteSchema, type QuoteValues } from "@/lib/validation/job";

export function QuoteForm({ jobId }: { jobId: string }) {
  const send = useSendQuote(jobId);
  const { control, register, handleSubmit, formState: { errors } } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { parts: [{ name: "", price: 0 }], labour: 20000, note: "" },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "parts" });
  const [parts, labour] = useWatch({ control, name: ["parts", "labour"] });
  const total = (parts ?? []).reduce((sum, part) => sum + (Number(part?.price) || 0), 0) + (Number(labour) || 0);

  return (
    <form onSubmit={handleSubmit((values) => send.mutate(values))} noValidate className="space-y-5">
      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-medium">Parts</legend>
        <ul className="space-y-3">
          {fields.map((field, index) => (
            <li key={field.id} className="grid grid-cols-[1fr_7.5rem_auto] items-start gap-2">
              <div>
                <label htmlFor={`part-${index}-name`} className="sr-only">Part {index + 1} name</label>
                <Input {...fieldAria(`part-${index}-name`, errors.parts?.[index]?.name?.message)} placeholder="Part name" {...register(`parts.${index}.name`)} />
              </div>
              <div>
                <label htmlFor={`part-${index}-price`} className="sr-only">Part {index + 1} price in naira</label>
                <Input {...fieldAria(`part-${index}-price`, errors.parts?.[index]?.price?.message)} type="number" inputMode="numeric" min={0} placeholder="₦" {...register(`parts.${index}.price`, { valueAsNumber: true })} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(index)} aria-label={`Remove part ${index + 1}`}>
                <Trash2 aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="sm" onClick={() => append({ name: "", price: 0 })}>
          <Plus aria-hidden="true" />
          Add part
        </Button>
      </fieldset>
      <Field id="labour" label="Labour cost (₦)" error={errors.labour?.message}>
        <Input {...fieldAria("labour", errors.labour?.message)} type="number" inputMode="numeric" min={0} {...register("labour", { valueAsNumber: true })} />
      </Field>
      <Field id="quote-note" label="Note to the hospital" optional>
        <Textarea id="quote-note" className="min-h-20" placeholder="Parts availability, how long the repair takes…" {...register("note")} />
      </Field>
      <output htmlFor="labour" className="flex items-center justify-between rounded-xl bg-accent/70 px-4 py-3">
        <span className="text-sm font-medium">Total</span>
        <span className="text-xl font-semibold tabular-nums">{formatNaira(total)}</span>
      </output>
      <Button type="submit" size="lg" className="w-full" loading={send.isPending}>
        <Send aria-hidden="true" />
        Send quote
      </Button>
    </form>
  );
}
