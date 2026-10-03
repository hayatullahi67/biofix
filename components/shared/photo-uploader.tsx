"use client";

import Image from "next/image";
import { Camera, ImagePlus, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/utils/image";

interface PhotoUploaderProps {
  legend: string;
  value: string[];
  onChange: (photos: string[]) => void;
  max?: number;
  hint?: string;
}

export function PhotoUploader({ legend, value, onChange, max = 3, hint }: PhotoUploaderProps) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const hintId = useId();
  const full = value.length >= max;

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const selected = Array.from(files).slice(0, max - value.length);
      const photos = await Promise.all(selected.map((file) => compressImage(file)));
      onChange([...value, ...photos]);
    } catch {
      toast.error("That photo couldn't be added. Try another image.");
    } finally {
      setBusy(false);
      if (cameraRef.current) cameraRef.current.value = "";
      if (galleryRef.current) galleryRef.current.value = "";
    }
  };

  return (
    <fieldset className="space-y-3" aria-describedby={hint ? hintId : undefined}>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      {hint ? <p id={hintId} className="-mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      {value.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3">
          {value.map((photo, index) => (
            <li key={`${index}-${photo.slice(-12)}`} className="relative">
              <figure className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                <Image src={photo} alt={`Photo ${index + 1} of the fault`} fill sizes="120px" className="object-cover" unoptimized={photo.startsWith("data:")} />
              </figure>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, photoIndex) => photoIndex !== index))}
                className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-soft)] hover:text-danger"
                aria-label={`Remove photo ${index + 1}`}
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" size="lg" className="h-14 text-sm" disabled={full} loading={busy} onClick={() => cameraRef.current?.click()}>
          {!busy ? <Camera aria-hidden="true" /> : null}
          Take photo
        </Button>
        <Button type="button" variant="outline" size="lg" className="h-14 text-sm" disabled={full || busy} onClick={() => galleryRef.current?.click()}>
          <ImagePlus aria-hidden="true" />
          From gallery
        </Button>
      </div>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} aria-label="Take a photo with your camera" onChange={(event) => void handleFiles(event.target.files)} />
      <input ref={galleryRef} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} aria-label="Choose photos from your gallery" onChange={(event) => void handleFiles(event.target.files)} />
    </fieldset>
  );
}
