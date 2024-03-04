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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useStepsDispatchContext } from "../stepsProvider";

const mainDetailsSchema = z.object({
  projectName: z.string(),
  projectEntity: z.string(),
  projectDuration: z.string(),
  projectBudget: z.string(),
  projectSummary: z.string(),
});
type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;

export function MainDetails() {
  const dispatch = useStepsDispatchContext();
  const form = useForm<mainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      projectName: "",
      projectEntity: "",
      projectDuration: "",
      projectBudget: "",
      projectSummary: "",
    } satisfies mainDetailsSchema,
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async () => {
          dispatch({ type: "INCREMENT_STEP" });
        })}
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of your project"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectEntity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of entity responsible for project"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposed project duration</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter proposed project duration"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposed budget</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter proposed budget" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your project" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-4 self-end px-16"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
