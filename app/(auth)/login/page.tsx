import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { DemoAccounts } from "@/components/auth/demo-accounts";
import { LoginForm } from "@/components/auth/login-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log in",
  description:
    "Log in to Biofix to manage your hospital's medical equipment, report faults, or find biomedical repair jobs. Try a demo as an admin, nurse or technician.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" description="Log in to your Biofix workspace. Demo password: biofix123">
      <Suspense>
        <LoginForm />
        <DemoAccounts />
      </Suspense>
    </AuthShell>
  );
}
