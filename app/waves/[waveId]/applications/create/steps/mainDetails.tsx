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
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/imageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";
import { uploadImage } from "./uploadImageAction";

export const mainDetailsSchema = z.object({
  imageId: z.string().optional(),
  name: z.string(),
  entityName: z.string(),
  duration: z.string(),
  budget: z.string(),
  summary: z.string(),
});
export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;

export function MainDetails() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<mainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      imageId: applicationData.imageId ?? "",
      name: applicationData.name ?? "",
      entityName: applicationData.entityName ?? "",
      duration: applicationData.duration ?? "",
      budget: applicationData.budget ?? "",
      summary: applicationData.summary ?? "",
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
          imageId={form.watch("imageId")}
          placeholder="Upload cover image"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              const formData = new FormData();
              formData.append("image", file);
              const imageId = await uploadImage(formData);
              form.setValue("imageId", imageId, {
                shouldValidate: true,
              });
            }
          }}
        />

        <FormField
          control={form.control}
          name="imageId"
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
          name="name"
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
          name="entityName"
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
          name="duration"
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
          name="budget"
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

        <FormFooter className="justify-end">
          <Button disabled={form.formState.isSubmitting}>
            Next
            <ArrowIcon direction="right" className="h-4 w-4" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
