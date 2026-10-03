"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, fieldAria } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-auth";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  return (
    <form onSubmit={handleSubmit((values) => login.mutate(values))} noValidate className="space-y-5">
      <Field id="email" label="Email" error={errors.email?.message}>
        <Input {...fieldAria("email", errors.email?.message)} type="email" autoComplete="email" inputMode="email" placeholder="you@hospital.ng" {...register("email")} />
      </Field>
      <Field id="password" label="Password" error={errors.password?.message}>
        <PasswordInput {...fieldAria("password", errors.password?.message)} autoComplete="current-password" {...register("password")} />
      </Field>
      <Button type="submit" size="lg" className="w-full" loading={login.isPending}>
        Log in
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New to Biofix?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
