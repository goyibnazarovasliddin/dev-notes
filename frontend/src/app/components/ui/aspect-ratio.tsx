"use client";

/**
 * src/app/components/ui/aspect-ratio.tsx
 * Purpose: Primitive for maintaining element aspect ratios.
 * Connected Files:
 * - Used by image components.
 */
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
