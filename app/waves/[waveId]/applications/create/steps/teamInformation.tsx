"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

export const teamInformationSchema = z.object({
  teamSummary: z.string(),
});
export type teamInformationSchema = z.infer<typeof teamInformationSchema>;

export function TeamInformation() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<teamInformationSchema>({
    resolver: zodResolver(teamInformationSchema),
    defaultValues: {
      teamSummary: applicationData.teamSummary ?? "",
    } satisfies teamInformationSchema,
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (payload) => {
          dispatch({ type: "UPDATE_APPLICATION_DATA", payload });
          dispatch({ type: "INCREMENT_STEP" });
        })}
      >
        <FormField
          control={form.control}
          name="teamSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your team" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormFooter>
          <Button
            disabled={form.formState.isSubmitting}
            variant="secondary"
            type="button"
            onClick={() => dispatch({ type: "DECREMENT_STEP" })}
          >
            <ArrowIcon direction="left" className="h-4 w-4" />
            Back
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
          >
            Next
            <ArrowIcon direction="right" className="h-4 w-4" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
