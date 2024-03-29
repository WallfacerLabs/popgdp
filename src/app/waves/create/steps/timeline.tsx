"use client";

import { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Form, FormFooter } from "@/components/ui/form";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
} from "../stepsProvider";
import { CalendarField } from "./calendarField";
import { timelineSchema } from "./timeline.schema";

export function Timeline({
  className,
}: Pick<HTMLAttributes<HTMLFormElement>, "className">) {
  const router = useRouter();
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
        className={cn("flex w-full flex-col gap-6", className)}
        onSubmit={form.handleSubmit(async (payload) => {
          dispatch({ type: "UPDATE_WAVE_DATA", payload });
          router.push("/waves/create/preview");
        })}
      >
        <div className="flex rounded-2xl border">
          <div className="border-l p-6 first:border-none">
            <CalendarField
              control={form.control}
              name="openStartDate"
              title="Open"
            />
          </div>
          <div className="border-l p-6 first:border-none">
            <CalendarField
              control={form.control}
              name="denoisingStartDate"
              title="Denoising"
            />
          </div>
          <div className="border-l p-6 first:border-none">
            <CalendarField
              control={form.control}
              name="assesmentStartDate"
              title="Assesment"
            />
          </div>
          <div className="border-l p-6 first:border-none">
            <CalendarField
              control={form.control}
              name="closeDate"
              label="Close date"
              title="Close"
            />
          </div>
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
