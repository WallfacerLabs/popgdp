"use client";

import { type ComponentProps } from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

import { ChevronIcon } from "../icons/chevronIcon";

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        caption: "flex justify-center relative items-center pt-2",
        caption_label: "text-sm font-medium",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 hover:opacity-100",
          "focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-background hover:border-primary focus-visible:bg-background focus-visible:border-primary",
        ),
        nav_button_previous: "!absolute left-1 !rounded",
        nav_button_next: "!absolute right-1 !rounded",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 p-0 font-normal border-transparent rounded",
          "focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-background hover:border-primary focus-visible:bg-background focus-visible:border-primary",
          "aria-selected:opacity-100 aria-selected:bg-primary aria-selected:border-primary",
        ),
        day_range_end: "day-range-end rounded",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronIcon direction="left" />,
        IconRight: ({ ...props }) => <ChevronIcon direction="right" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
