"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
} from "../stepsProvider";
import { FORM_FIELD_PARAMS, mainDetailsSchema } from "./mainDetails.schema";

export function MainDetails() {
  const { waveData } = useWaveStepsContext();
  const dispatch = useWaveStepsDispatchContext();

  const form = useForm<mainDetailsSchema>({
    resolver: zodResolver(mainDetailsSchema),
    defaultValues: {
      name: waveData.name ?? "",
      summary: waveData.summary ?? "",
    },
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
          name="summary"
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
