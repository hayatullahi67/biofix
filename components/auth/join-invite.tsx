"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Link2Off } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAcceptInvite } from "@/hooks/use-auth";
import { useInvite } from "@/hooks/use-team";
import { acceptInviteSchema, type AcceptInviteValues } from "@/lib/validation/auth";
import { PasswordInput } from "./password-input";

export function JoinInvite({ code }: { code: string }) {
  const invite = useInvite(code);
  const accept = useAcceptInvite(code);
  const { register, handleSubmit, formState: { errors } } = useForm<AcceptInviteValues>({
    resolver: zodResolver(acceptInviteSchema),
    values: { name: invite.data?.name ?? "", password: "", confirmPassword: "" },
  });

  if (invite.isPending) return <Skeleton className="h-80 w-full rounded-2xl" />;
  if (invite.isError || invite.data.status !== "pending") {
    return (
      <EmptyState
        icon={Link2Off}
        title="This invite link has expired"
        description="Ask your hospital admin to send you a new invite from the Team page."
        action={<Button asChild variant="outline"><Link href="/login">Go to login</Link></Button>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card as="section" aria-label="Hospital" className="flex items-center gap-4 p-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
          <Building2 className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">{invite.data.hospitalName}</p>
          <p className="text-xs text-muted-foreground">{invite.data.hospitalArea}{invite.data.ward ? ` · ${invite.data.ward}` : ""}</p>
        </div>
      </Card>
      <form onSubmit={handleSubmit((values) => accept.mutate({ name: values.name, password: values.password }))} noValidate className="space-y-5">
        <Field id="name" label="Your full name" error={errors.name?.message}>
          <Input {...fieldAria("name", errors.name?.message)} autoComplete="name" {...register("name")} />
        </Field>
        <Field id="password" label="Create a password" error={errors.password?.message} hint="At least 8 characters">
          <PasswordInput {...fieldAria("password", errors.password?.message, "At least 8 characters")} autoComplete="new-password" {...register("password")} />
        </Field>
        <Field id="confirmPassword" label="Confirm password" error={errors.confirmPassword?.message}>
          <PasswordInput {...fieldAria("confirmPassword", errors.confirmPassword?.message)} autoComplete="new-password" {...register("confirmPassword")} />
        </Field>
        <Button type="submit" size="lg" className="w-full" loading={accept.isPending}>
          Join {invite.data.hospitalName}
        </Button>
      </form>
    </div>
  );
}
