import Image from "next/image";
import { cn } from "@/lib/utils";

interface MachinePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function MachinePhoto({ src, alt, caption, className, sizes = "(min-width: 1024px) 400px, 100vw", priority = false }: MachinePhotoProps) {
  const unoptimized = src.startsWith("data:") || src.startsWith("blob:");
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-muted", className)}>
      <div className="relative aspect-[10/7] w-full">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} unoptimized={unoptimized} />
      </div>
      {caption ? <figcaption className="border-t border-border bg-card px-4 py-2.5 text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
