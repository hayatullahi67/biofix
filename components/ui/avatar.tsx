import Image from "next/image";
import { cn, initials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-base", xl: "size-20 text-xl" };
const pixels = { sm: 32, md: 40, lg: 48, xl: 80 };
const palettes = [
  "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
  "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
];

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const palette = palettes[name.length % palettes.length];
  return (
    <span className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold ring-2 ring-card", sizes[size], !src && palette, className)}>
      {src ? (
        <Image src={src} alt={`Photo of ${name}`} width={pixels[size]} height={pixels[size]} className="size-full object-cover" unoptimized={src.startsWith("data:") || src.startsWith("blob:")} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
      {!src ? <span className="sr-only">{name}</span> : null}
    </span>
  );
}
