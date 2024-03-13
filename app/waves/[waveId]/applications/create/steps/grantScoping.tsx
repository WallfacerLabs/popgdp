"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

export const grantScopingSchema = z.object({
  idea: z.string(),
  reason: z.string(),
  state: z.string(),
  goals: z.string(),
  requirements: z.string(),
});
export type grantScopingSchema = z.infer<typeof grantScopingSchema>;

export function GrantScoping() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<grantScopingSchema>({
    resolver: zodResolver(grantScopingSchema),
    defaultValues: {
      idea: applicationData.idea ?? "",
      reason: applicationData.reason ?? "",
      state: applicationData.state ?? "",
      goals: applicationData.goals ?? "",
      requirements: applicationData.requirements ?? "",
    } satisfies grantScopingSchema,
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
          name="idea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project idea</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your project" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why this & why now</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about why this and why now"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current state</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what is the current state of your project"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project goals</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what are the goals of your project"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what are the requirements of your project"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            disabled={form.formState.isSubmitting}
            className="mt-4 self-end px-16"
            variant="secondary"
            type="button"
            onClick={() => dispatch({ type: "DECREMENT_STEP" })}
          >
            Back
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            className="mt-4 self-end px-16"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
