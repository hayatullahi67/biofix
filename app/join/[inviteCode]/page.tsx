import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { JoinInvite } from "@/components/auth/join-invite";

export default async function JoinPage({ params }: PageProps<"/join/[inviteCode]">) {
  const { inviteCode } = await params;
  return (
    <AuthShell title="You're invited" description="Set up your nurse account to report broken machines in seconds.">
      <Suspense>
        <JoinInvite code={inviteCode} />
      </Suspense>
    </AuthShell>
  );
}
