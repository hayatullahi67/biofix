"use client";

import { Camera } from "lucide-react";
import { useId } from "react";
import { Avatar } from "@/components/ui/avatar";
import { compressImage } from "@/lib/utils/image";

export function AvatarUpload({ name, value, onChange }: { name: string; value?: string; onChange: (url: string) => void }) {
  const id = useId();
  return (
    <div className="flex items-center gap-4">
      <Avatar name={name || "Technician"} src={value} size="xl" />
      <div>
        <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-[var(--shadow-soft)] transition-colors hover:bg-muted has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
          <Camera className="size-4" aria-hidden="true" />
          Change photo
          <input
            id={id}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) onChange(await compressImage(file, 320));
            }}
          />
        </label>
        <p className="mt-1.5 text-xs text-muted-foreground">A clear photo helps hospitals recognise you.</p>
      </div>
    </div>
  );
}
