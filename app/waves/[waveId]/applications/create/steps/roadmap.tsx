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

export const roadmapSchema = z.object({
  tbd: z.string(),
});
export type roadmapSchema = z.infer<typeof roadmapSchema>;

export function Roadmap() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<roadmapSchema>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      tbd: applicationData.tbd ?? "",
    } satisfies roadmapSchema,
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
          name="tbd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TBD</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tbd" />
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

          <Button disabled={form.formState.isSubmitting}>
            Next
            <ArrowIcon direction="right" className="h-4 w-4" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
