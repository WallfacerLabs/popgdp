"use client";

import { useState } from "react";
import { Control, type FieldPath } from "react-hook-form";

import { type WaveStage } from "@/config/waveStages";
import { formatDate, getStartOfDate } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@/components/icons/calendarIcon";

import { type TimelineSchema } from "./timeline.schema";

export interface CalendarFieldProps {
  name: FieldPath<TimelineSchema>;
  control: Control<TimelineSchema>;
  label: string;
  stage: WaveStage;
}

export const CalendarField = ({
  name,
  control,
  label,
  stage,
}: CalendarFieldProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const todayDate = getStartOfDate(new Date());

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem aria-required>
          <div className="mb-4 font-bold capitalize">{stage}</div>
          <FormLabel>{label}</FormLabel>
          <Popover
            open={isPopoverOpen}
            onOpenChange={(value) => setIsPopoverOpen(value)}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className="h-12 w-40 justify-start gap-2 aria-[invalid=true]:border-red"
                >
                  <CalendarIcon className="h-6 w-6" />
                  {field.value ? formatDate(field.value) : "Pick a date"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                defaultMonth={field.value}
                selected={field.value}
                onSelect={(value) => {
                  field.onChange(value);
                  setIsPopoverOpen(false);
                }}
                disabled={(date) => date < todayDate}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
