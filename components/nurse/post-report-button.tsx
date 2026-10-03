"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { PostJobDialog } from "@/components/shared/post-job-dialog";
import { Button } from "@/components/ui/button";

export function PostReportButton({ jobId, machineName }: { jobId: string; machineName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Send aria-hidden="true" />
        Post job
      </Button>
      <PostJobDialog jobId={jobId} machineName={machineName} open={open} onOpenChange={setOpen} />
    </>
  );
}
