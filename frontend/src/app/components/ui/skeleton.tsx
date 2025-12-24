/**
 * src/app/components/ui/skeleton.tsx
 * Purpose: Loading placeholder animation.
 * Connected Files:
 * - Used during data fetching.
 */
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
