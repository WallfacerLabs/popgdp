"use client";

import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormCounter,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessages,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

const FORM_FIELD_PARAMS = {
  projectIdea: { min: 1, max: 500 },
  reason: { min: 1, max: 500 },
  state: { min: 1, max: 500 },
  goals: { min: 1, max: 500 },
  requirements: { min: 1, max: 500 },
};

export const grantScopingSchema = z.object({
  idea: specificLengthStringSchema(
    "Project idea",
    FORM_FIELD_PARAMS.projectIdea,
  ),
  reason: specificLengthStringSchema(
    "Project reason",
    FORM_FIELD_PARAMS.reason,
  ),
  state: specificLengthStringSchema("Project state", FORM_FIELD_PARAMS.state),
  goals: specificLengthStringSchema("Project goals", FORM_FIELD_PARAMS.goals),
  requirements: specificLengthStringSchema(
    "Project requirements",
    FORM_FIELD_PARAMS.requirements,
  ),
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
            <FormItem aria-required>
              <FormLabel>Project idea</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your project" />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.projectIdea.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Why this & why now</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about why this and why now"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.reason.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Current state</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what is the current state of your project"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.state.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Project goals</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what are the goals of your project"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.goals.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us what are the requirements of your project"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.requirements.max} />
              </FormMessages>
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
            <ArrowIcon direction="left" />
            Back
          </Button>

          <Button disabled={form.formState.isSubmitting}>
            Next
            <ArrowIcon direction="right" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
