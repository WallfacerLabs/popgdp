"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CategoryPicker } from "@/components/ui/categories/categoryPicker";
import { getCategoryIcon } from "@/components/ui/categories/getCategoryIcon";
import { getCategoryStyles } from "@/components/ui/categories/getCategoryStyles";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { CrossIcon } from "@/components/icons/crossIcon";
import { PlusCircleIcon } from "@/components/icons/plusCircleIcon";

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
} from "../stepsProvider";
import {
  FORM_FIELD_PARAMS,
  mainDetailsSchema,
  type MainDetailsSchema,
} from "./mainDetails.schema";

export function MainDetails() {
  const { waveData } = useWaveStepsContext();
  const dispatch = useWaveStepsDispatchContext();

  const form = useForm<MainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      name: waveData.name ?? "",
      summary: waveData.summary ?? "",
      categories: waveData.categories ?? [{ name: "", description: "" }],
    },
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          dispatch({ type: "UPDATE_WAVE_DATA", payload: data });
          dispatch({ type: "INCREMENT_STEP" });
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Wave name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormCounter limit={FORM_FIELD_PARAMS[field.name].max} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Wave summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormCounter limit={FORM_FIELD_PARAMS[field.name].max} />
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset aria-required className="group">
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <>
                <FormLabel className="mb-4">
                  Set categories for upcoming wave
                </FormLabel>
                <FormMessages>
                  <FormMessage />
                </FormMessages>
              </>
            )}
          />
          <ul className="flex flex-col gap-4">
            {categoryFields.map((_, index) => (
              <CategoryField
                index={index}
                removeCategory={removeCategory}
                key={index}
              />
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            className="mt-2 w-full"
            onClick={() =>
              appendCategory({
                color: undefined as any,
                description: "",
                name: "",
              })
            }
          >
            <PlusCircleIcon />
            Add category
          </Button>
        </fieldset>

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

interface CategoryFieldProps {
  index: number;
  removeCategory: UseFieldArrayRemove;
}

function CategoryField({ index, removeCategory }: CategoryFieldProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const form = useFormContext<MainDetailsSchema>();

  return (
    <li className="relative rounded-3xl border p-6">
      <div className="flex items-center gap-4">
        <FormField
          name={`categories.${index}.color`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Category icon</FormLabel>
              <Popover
                open={isPopoverOpen}
                onOpenChange={(open) => setIsPopoverOpen(open)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn(
                        "rounded-full transition-opacity hover:opacity-70",
                        "aria-[invalid=true]:border-red",
                        getCategoryStyles(field.value),
                      )}
                    >
                      {getCategoryIcon(field.value)}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <CategoryPicker
                    name={field.name}
                    onChange={(value) => {
                      field.onChange(value);
                      setIsPopoverOpen(false);
                    }}
                    value={field.value}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          name={`categories.${index}.name`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>#{index + 1} Category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS.category.name.max} />
              </FormMessages>
            </FormItem>
          )}
        />
      </div>

      <FormField
        name={`categories.${index}.description`}
        control={form.control}
        render={({ field }) => (
          <FormItem className="mt-2 w-full">
            <FormLabel>Category description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessages>
              <FormMessage />
              <FormCounter limit={FORM_FIELD_PARAMS.category.description.max} />
            </FormMessages>
          </FormItem>
        )}
      />
      <Button
        size="icon"
        className="absolute right-0 top-0 h-8 w-8 -translate-y-1/3 translate-x-1/3 rounded-full text-red"
        variant="outline"
        onClick={() => removeCategory(index)}
      >
        <CrossIcon />
      </Button>
    </li>
  );
}
