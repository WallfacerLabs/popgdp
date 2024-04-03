"use client";

import {
  imageSchema,
  positiveNumberSchema,
  specificLengthStringSchema,
} from "@/constants/validationSchemas";
import { Categories } from "@/drizzle/queries/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { getCategoryIcon } from "@/components/ui/categories/getCategoryIcon";
import { getCategoryStyles } from "@/components/ui/categories/getCategoryStyles";
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
  FormMessages,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/components/ui/radioGroup";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/uploads/imageUpload";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import { WorldcoinIcon } from "@/components/icons/worldcoinIcon";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

const FORM_FIELD_PARAMS = {
  name: { min: 1, max: 36 },
  entityName: { min: 1, max: 36 },
  summary: { min: 1, max: 160 },
  duration: { min: 1, max: 36 },
};

export const mainDetailsSchema = z.object({
  image: imageSchema.optional(),
  name: specificLengthStringSchema("Project name", FORM_FIELD_PARAMS.name),
  entityName: specificLengthStringSchema(
    "Entity name",
    FORM_FIELD_PARAMS.entityName,
  ),
  duration: specificLengthStringSchema(
    "Project duration",
    FORM_FIELD_PARAMS.duration,
  ),
  budget: positiveNumberSchema("Project budget"),
  summary: specificLengthStringSchema("Entity name", FORM_FIELD_PARAMS.summary),
  categoryId: z.string(),
});
export type MainDetailsSchema = z.infer<typeof mainDetailsSchema>;

export function MainDetails({ categories }: { categories: Categories }) {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<MainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      image: applicationData.image ?? undefined,
      name: applicationData.name ?? "",
      entityName: applicationData.entityName ?? "",
      duration: applicationData.duration ?? "",
      budget: applicationData.budget ? applicationData.budget.toString() : "",
      summary: applicationData.summary ?? "",
      categoryId: applicationData.categoryId ?? undefined,
    } satisfies Record<keyof MainDetailsSchema, any> as any,
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  placeholder="Upload cover image"
                  image={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Project category:</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-3 gap-2"
                >
                  {categories.map((category) => (
                    <RadioGroupLabel
                      key={category.id}
                      className="justify-start"
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full [&>svg]:h-4 [&>svg]:w-4",
                          getCategoryStyles(category.color),
                        )}
                      >
                        {getCategoryIcon(category.color)}
                      </span>
                      <span className="text-xs font-bold">{category.name}</span>
                      <RadioGroupItem value={category.id} className="ml-auto" />
                    </RadioGroupLabel>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessages>
                <FormMessage />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of your project"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.name.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entityName"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Entity name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of entity responsible for project"
                />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.entityName.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Proposed project duration</FormLabel>
              <FormHint leftHint={<ClockIcon />}>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter proposed project duration"
                  />
                </FormControl>
              </FormHint>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.duration.max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem aria-required>
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
                  <Input
                    {...field}
                    placeholder="Enter proposed budget"
                    inputMode="numeric"
                  />
                </FormControl>
              </FormHint>
              <FormMessages>
                <FormMessage />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Project summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your project" />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.summary.max} />
              </FormMessages>
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
