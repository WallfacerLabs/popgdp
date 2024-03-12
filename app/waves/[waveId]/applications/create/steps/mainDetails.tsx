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
import { ImageUpload } from "@/components/ui/imageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";
import { uploadImage } from "./uploadImageAction";

export const mainDetailsSchema = z.object({
  projectImageId: z.string().optional(),
  projectName: z.string(),
  projectEntity: z.string(),
  projectDuration: z.string(),
  projectBudget: z.string(),
  projectSummary: z.string(),
});
export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;

export function MainDetails() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<mainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      projectImageId: applicationData.projectImageId ?? "",
      projectName: applicationData.projectName ?? "",
      projectEntity: applicationData.projectEntity ?? "",
      projectDuration: applicationData.projectDuration ?? "",
      projectBudget: applicationData.projectBudget ?? "",
      projectSummary: applicationData.projectSummary ?? "",
    } satisfies mainDetailsSchema,
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
        <ImageUpload
          imageId={form.watch("projectImageId")}
          placeholder="Upload cover image"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              const formData = new FormData();
              formData.append("image", file);
              const imageId = await uploadImage(formData);
              form.setValue("projectImageId", String(imageId), {
                shouldValidate: true,
              });
            }
          }}
        />

        <FormField
          control={form.control}
          name="projectImageId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
