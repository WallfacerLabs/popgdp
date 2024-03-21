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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";

const FORM_FIELD_PARAMS = {
  waveName: {
    min: 3,
    max: 20,
  },
  waveSummary: {
    min: 3,
    max: 160,
  },
};

export const mainDetailsSchema = z.object({
  waveName: specificLengthStringSchema("Wave name", FORM_FIELD_PARAMS.waveName),
  waveSummary: specificLengthStringSchema(
    "Wave summary",
    FORM_FIELD_PARAMS.waveSummary,
  ),
});

export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;

export function MainDetails() {
  const form = useForm<mainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      waveName: "",
      waveSummary: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (data) => {})}
      >
        <FormField
          control={form.control}
          name="waveName"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Wave name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormCounter
                current={field.value.length}
                limit={FORM_FIELD_PARAMS[field.name].max}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waveSummary"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Wave summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormCounter
                current={field.value.length}
                limit={FORM_FIELD_PARAMS[field.name].max}
              />
              <FormMessage />
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
