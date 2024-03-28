"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

interface SeparatorProps
  extends Omit<
    ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    "orientation"
  > {
  orientation?: "horizontal" | "vertical" | "dot";
}

export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const separatorOrientation =
      orientation === "dot" ? "horizontal" : orientation;

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={separatorOrientation}
        className={cn(separatorVariants({ orientation }), className)}
        {...props}
      />
    );
  },
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

const separatorVariants = cva(cn("bg-border shrink-0 rounded-full"), {
  variants: {
    orientation: {
      horizontal: "min-h-[1px] h-[1px] w-full",
      vertical: "h-full w-[1px] min-w-[1px]",
      dot: "h-1 min-h-1 w-1 min-w-1",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
