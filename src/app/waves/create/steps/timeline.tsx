"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { urls } from "@/constants/urls";
import waveTimelineDecorator from "@/images/waveTimelineDecorator.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/cn";
import { formatDate, formatTime, getUTCStartOfDate } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Form, FormFooter } from "@/components/ui/form";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
} from "../stepsProvider";
import { sequentTimelineSchema, type TimelineSchema } from "./timeline.schema";
import { TimelineStage } from "./timelineStage";

interface TimelineProps {
  className?: string;
}

export function Timeline({ className }: TimelineProps) {
  const router = useRouter();
  const { waveData } = useWaveStepsContext();
  const dispatch = useWaveStepsDispatchContext();

  const form = useForm<TimelineSchema>({
    resolver: zodResolver(sequentTimelineSchema),
    defaultValues: {
      openStartDate: waveData.openStartDate ?? undefined,
      denoisingStartDate: waveData.denoisingStartDate ?? undefined,
      assesmentStartDate: waveData.assesmentStartDate ?? undefined,
      closeDate: waveData.closeDate ?? undefined,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Image src={waveTimelineDecorator} alt="" />
      <Form {...form}>
        <form
          className={cn("flex w-full flex-col gap-6", className)}
          onSubmit={form.handleSubmit(async (payload) => {
            dispatch({ type: "UPDATE_WAVE_DATA", payload });
            router.push(urls.waves.createPreview);
          })}
        >
          <div className="flex rounded-2xl border">
            <TimelineStage
              name="openStartDate"
              control={form.control}
              label="Start date"
              stage="open"
              className="border-none"
            />
            <TimelineStage
              name="denoisingStartDate"
              control={form.control}
              label="Start date"
              stage="denoising"
            />
            <TimelineStage
              name="assesmentStartDate"
              control={form.control}
              label="Start date"
              stage="assesment"
            />
            <TimelineStage
              control={form.control}
              name="closeDate"
              label="Close date"
              stage="close"
            />
          </div>
          <div className="-mt-4 text-center text-xs opacity-60">
            {`Date set here will be stored in UTC timezone:
            ${formatDate(new Date())} is 
            ${formatTime(getUTCStartOfDate(new Date()))} 
            (${getUTCStartOfDate(new Date()).toISOString()})`}
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
    </div>
  );
}
