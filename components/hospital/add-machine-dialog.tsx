"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useCreateMachine } from "@/hooks/use-machines";
import { machineSchema, type MachineFormValues } from "@/lib/validation/machine";
import { MachineFormFields } from "./machine-form-fields";

interface AddMachineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const today = new Date().toISOString().slice(0, 10);

const defaults: MachineFormValues = {
  name: "",
  type: "Patient monitor",
  brand: "",
  model: "",
  serialNumber: "",
  ward: "",
  purchaseDate: today,
  warrantyEnd: today,
  serviceIntervalMonths: 6,
};

export function AddMachineDialog({ open, onOpenChange }: AddMachineDialogProps) {
  const form = useForm<MachineFormValues>({ resolver: zodResolver(machineSchema), defaultValues: defaults });
  const create = useCreateMachine(() => {
    form.reset(defaults);
    onOpenChange(false);
  });

  const submit = form.handleSubmit((values) =>
    create.mutate({
      ...values,
      purchaseDate: new Date(values.purchaseDate).toISOString(),
      warrantyEnd: new Date(values.warrantyEnd).toISOString(),
    }),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Add machine" description="Register a machine to track its status and print its QR sticker." size="lg">
        <form onSubmit={submit} noValidate className="space-y-6">
          <MachineFormFields register={form.register} control={form.control} errors={form.formState.errors} />
          <footer className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={create.isPending}>Add machine</Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
