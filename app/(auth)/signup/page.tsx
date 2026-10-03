import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupFlow } from "@/components/auth/signup-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Create an account for your hospital or as a technician",
  description:
    "Sign up for Biofix free. Hospitals track equipment and get faults fixed fast; biomedical technicians in Lagos and Abuja find verified repair jobs near them.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <AuthShell title="Create your account" description="Set up Biofix for your hospital, or join as a verified biomedical technician.">
      <Suspense fallback={<Skeleton className="h-[640px] w-full rounded-2xl" />}>
        <SignupFlow />
      </Suspense>
    </AuthShell>
  );
}
