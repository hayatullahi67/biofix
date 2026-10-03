"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { usePostJob } from "@/hooks/use-job-posting";
import { useCurrentUser } from "@/hooks/use-session";
import { postJobSchema, toJobContact, type PostJobValues } from "@/lib/validation/job-posting";
import { ContactFields } from "./contact-fields";

interface PostJobDialogProps {
  jobId: string;
  machineName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostJobDialog({ jobId, machineName, open, onOpenChange }: PostJobDialogProps) {
  const user = useCurrentUser();
  const post = usePostJob(() => onOpenChange(false));
  const { register, handleSubmit, formState: { errors } } = useForm<PostJobValues>({
    resolver: zodResolver(postJobSchema),
    defaultValues: { contact: { name: user.name, phone: user.phone, email: user.email.endsWith(".demo") ? "" : user.email, allowMessages: true } },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={`Post job: ${machineName}`} description="Verified technicians nearby will see this job and can apply or reach out to you.">
        <form onSubmit={handleSubmit((values) => post.mutate({ jobId, contact: toJobContact(values.contact) }))} noValidate className="space-y-6">
          <ContactFields register={register} errors={errors.contact} prefix="contact" idPrefix="post-job" />
          <footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={post.isPending}>
              <Send aria-hidden="true" />
              Post job
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
