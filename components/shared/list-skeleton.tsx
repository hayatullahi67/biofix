import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton({ rows = 3, className = "h-14" }: { rows?: number; className?: string }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className={`${className} w-full rounded-xl`} />
      ))}
    </div>
  );
}
