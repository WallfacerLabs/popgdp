"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useWaveParams } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

const resourcesSchema = z.object({
  tbd: z.string(),
});
export type resourcesSchema = z.infer<typeof resourcesSchema>;

export function Resources() {
  const router = useRouter();
  const { waveId } = useWaveParams();

  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<resourcesSchema>({
    resolver: zodResolver(resourcesSchema),
    defaultValues: {
      tbd: applicationData.tbd ?? "",
    } satisfies resourcesSchema,
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (payload) => {
          dispatch({ type: "UPDATE_APPLICATION_DATA", payload });
          router.push(`/waves/${waveId}/applications/create/preview`);
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

        <div className="flex justify-between">
          <Button
            disabled={form.formState.isSubmitting}
            className="mt-4 self-end px-16"
            variant="outline"
            type="button"
            onClick={() => dispatch({ type: "DECREMENT_STEP" })}
          >
            Back
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            className="mt-4 self-end px-16"
          >
            Preview
          </Button>
        </div>
      </form>
    </Form>
  );
}
