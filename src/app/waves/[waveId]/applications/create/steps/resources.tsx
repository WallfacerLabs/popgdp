"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { parseWaveParams } from "@/lib/paramsValidation";
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

export const resourcesSchema = z.object({
  tbd: z.string(),
});
export type ResourcesSchema = z.infer<typeof resourcesSchema>;

interface ResourcesProps {
  previewUrl: string;
}

export function Resources({ previewUrl }: ResourcesProps) {
  const router = useRouter();
  const { waveId } = parseWaveParams(useParams());

  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<ResourcesSchema>({
    resolver: zodResolver(resourcesSchema),
    defaultValues: {
      tbd: applicationData.tbd ?? "",
    } satisfies ResourcesSchema,
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (payload) => {
          dispatch({ type: "UPDATE_APPLICATION_DATA", payload });
          router.push(previewUrl);
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
            <ArrowIcon direction="left" />
            Back
          </Button>

          <Button disabled={form.formState.isSubmitting}>
            Preview
            <ArrowIcon direction="right" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
