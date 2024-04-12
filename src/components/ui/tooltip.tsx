"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/cn";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    {...props}
    className={cn(
      "rounded-full",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      className,
    )}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "text-popover-foreground z-50 overflow-hidden rounded-md border bg-background p-2 text-sm shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface ErrorTooltipProps {
  children: ReactNode;
  message: string | undefined;
}

export function ErrorTooltip({ children, message }: ErrorTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {message && <TooltipContent>{message}</TooltipContent>}
    </Tooltip>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
