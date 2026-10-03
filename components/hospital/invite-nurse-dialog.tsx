"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useInviteNurse } from "@/hooks/use-team";
import { inviteSchema, type InviteValues } from "@/lib/validation/team";

interface InviteNurseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteNurseDialog({ open, onOpenChange }: InviteNurseDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InviteValues>({ resolver: zodResolver(inviteSchema), defaultValues: { name: "", contact: "", ward: "" } });
  const invite = useInviteNurse(() => {
    reset();
    onOpenChange(false);
  });
  const hint = "We'll send an invite link by email or SMS";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Invite a nurse" description="Nurses can report broken machines and see their status." size="sm">
        <form onSubmit={handleSubmit((values) => invite.mutate(values))} noValidate className="space-y-5">
          <Field id="invite-name" label="Full name" error={errors.name?.message}>
            <Input {...fieldAria("invite-name", errors.name?.message)} autoComplete="off" {...register("name")} />
          </Field>
          <Field id="invite-contact" label="Email or phone" error={errors.contact?.message} hint={hint}>
            <Input {...fieldAria("invite-contact", errors.contact?.message, hint)} autoComplete="off" placeholder="nurse@hospital.ng or 0803 123 4567" {...register("contact")} />
          </Field>
          <Field id="invite-ward" label="Ward" optional>
            <Input id="invite-ward" placeholder="ICU" {...register("ward")} />
          </Field>
          <footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={invite.isPending}>Send invite</Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
