"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

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

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
} from "../stepsProvider";
import { timelineSchema } from "./timeline.schema";

export function Timeline() {
  const { waveData } = useWaveStepsContext();
  const dispatch = useWaveStepsDispatchContext();

  const form = useForm<timelineSchema>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      openStartDate: waveData.openStartDate ?? undefined,
      denoisingStartDate: waveData.denoisingStartDate ?? undefined,
      assesmentStartDate: waveData.assesmentStartDate ?? undefined,
      closeDate: waveData.closeDate ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (payload) => {
          dispatch({ type: "UPDATE_WAVE_DATA", payload });
        })}
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
            onClick={() => dispatch({ type: "DECREMENT_STEP" })}
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
                <Button
                  variant="outline"
                  className="h-12 w-40 justify-start gap-2 aria-[invalid=true]:border-destructive"
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