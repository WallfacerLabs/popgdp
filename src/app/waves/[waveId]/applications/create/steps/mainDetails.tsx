"use client";

import { ChangeEvent, useRef } from "react";
import {
  positiveNumberSchema,
  specificLengthStringSchema,
} from "@/constants/validationSchemas";
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
  FormHint,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/imageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import { WorldcoinIcon } from "@/components/icons/worldcoinIcon";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";
import { uploadImage } from "./uploadImageAction";

const FORM_FIELD_PARAMS = {
  name: { min: 1, max: 20 },
};

export const mainDetailsSchema = z.object({
  imageId: z.string().optional(),
  name: specificLengthStringSchema("Project name", FORM_FIELD_PARAMS.name),
  entityName: z.string(),
  duration: z.string(),
  budget: positiveNumberSchema("Project budget"),
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
      budget: applicationData.budget ? applicationData.budget.toString() : "",
      summary: applicationData.summary ?? "",
    } satisfies Record<keyof mainDetailsSchema, string> as any,
  });

  const imageUploadRef = useRef<HTMLInputElement>(null);

  async function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const imageId = await uploadImage(formData);
      form.setValue("imageId", imageId, {
        shouldValidate: true,
      });
    }
  }

  function onImageRemove() {
    form.setValue("imageId", "", {
      shouldValidate: true,
    });
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  }

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
          ref={imageUploadRef}
          imageId={form.watch("imageId")}
          placeholder="Upload cover image"
          onChange={onImageChange}
          onRemove={onImageRemove}
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
              <FormCounter
                current={field.value.length}
                limit={FORM_FIELD_PARAMS.name.max}
              />
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
              <FormHint leftHint={<ClockIcon />}>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter proposed project duration"
                  />
                </FormControl>
              </FormHint>
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
              <FormHint
                className="[&>input]:pr-20"
                rightHint={
                  <div className="flex items-center gap-1">
                    <WorldcoinIcon />
                    <span className="opacity-60">WLD</span>
                  </div>
                }
              >
                <FormControl>
                  <Input {...field} placeholder="Enter proposed budget" />
                </FormControl>
              </FormHint>
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
            <ArrowIcon direction="right" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
