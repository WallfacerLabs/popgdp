"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex items-center justify-center text-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex h-fit min-h-10 items-center justify-center whitespace-nowrap rounded-2xl px-3 py-2 text-sm font-bold outline-none ring-offset-background transition-all",
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:rounded-full before:bg-primary before:transition-all",
      "data-[state=active]:before:scale-x-100 [&:not(:disabled):not([data-state=active])]:hover:before:scale-x-50 [&:not(:disabled):not([data-state=active])]:focus-visible:before:scale-x-50",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=inactive]:hidden",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
