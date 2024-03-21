"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { z } from "zod";

import { formatDate, getStartOfDate } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { CalendarIcon } from "@/components/icons/calendarIcon";

export const timelineSchema = z.object({
  openStartDate: z.date(),
  denoisingStartDate: z.date(),
  assesmentStartDate: z.date(),
  closeDate: z.date(),
});

export type timelineSchema = z.infer<typeof timelineSchema>;

export function Timeline() {
  const form = useForm<timelineSchema>({
    resolver: zodResolver(timelineSchema),
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (data) => {})}
      >
        <div className="grid grid-cols-2 gap-y-8 rounded-2xl border p-6">
          <CalendarField
            control={form.control}
            name="openStartDate"
            title="Open"
          />
          <CalendarField
            control={form.control}
            name="denoisingStartDate"
            title="Denoising"
          />
          <CalendarField
            control={form.control}
            name="assesmentStartDate"
            title="Assesment"
          />
          <CalendarField
            control={form.control}
            name="closeDate"
            label="Close date"
            title="Close"
          />
        </div>

        <FormFooter>
          <Button
            disabled={form.formState.isSubmitting}
            variant="secondary"
            type="button"
          >
            <ArrowIcon direction="left" />
            Back
          </Button>

          <Button disabled={form.formState.isSubmitting}>
            Preview
            <ArrowIcon direction="right" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}

const CalendarField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label = "Start date",
  title,
}: Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
  label?: string;
  title: string;
}) => {
  const todayDate = getStartOfDate(new Date());

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem aria-required>
          <div className="mb-4 font-bold">{title}</div>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" className="h-12 w-40 justify-start">
                  <CalendarIcon className="h-6 w-6" />
                  {field.value ? (
                    formatDate(field.value)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                defaultMonth={field.value}
                selected={field.value}
                onSelect={field.onChange}
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
