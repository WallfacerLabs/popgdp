"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { createApplicationSchema } from "./createApplicationSchema";

export function MainDetails({ waveId }: { waveId: string }) {
  const dispatch = useStepsDispatchContext();
  const form = useForm<createApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      projectName: "",
      projectEntity: "",
      projectDuration: "",
      projectBudget: "",
      summary: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-xl flex-col gap-6"
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
          name="summary"
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
