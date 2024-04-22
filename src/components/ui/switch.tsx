"use client";

import { ComponentPropsWithRef, ElementRef, forwardRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/cn";

type SwitchProps = ComponentPropsWithRef<typeof SwitchPrimitives.Root>;

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border bg-border p-px transition-colors",
      "hover:border-primary focus-visible:border-primary focus-visible:outline-none",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=unchecked]:bg-border",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
