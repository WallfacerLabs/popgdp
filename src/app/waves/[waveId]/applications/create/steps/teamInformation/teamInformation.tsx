"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  useStepsContext,
  useStepsDispatchContext,
} from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { MemberField } from "./memberField";
import { MemberPreview } from "./memberPreview";

export const teamInformationSchema = z.object({
  teamSummary: z.string(),
  members: z.array(
    z.object({
      imageId: z.string().optional(),
      name: z.string(),
      position: z.string(),
    }),
  ),
});
export type teamInformationSchema = z.infer<typeof teamInformationSchema>;

export function TeamInformation() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<teamInformationSchema>({
    resolver: zodResolver(teamInformationSchema),
    defaultValues: {
      teamSummary: applicationData.teamSummary ?? "",
      members: applicationData.members ?? [
        { imageId: "", name: "", position: "" },
      ],
    } satisfies teamInformationSchema,
  });

  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control: form.control,
    name: "members",
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
          name="teamSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your team" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Members</FormLabel>
          <ul className="flex flex-col gap-4 rounded-3xl border p-6">
            {memberFields.map((field, index, array) =>
              index === array.length - 1 ? (
                <MemberField
                  key={field.id}
                  form={form}
                  index={index}
                  appendMember={appendMember}
                />
              ) : (
                <MemberPreview
                  key={field.id}
                  member={field}
                  removeMember={removeMember}
                  index={index}
                />
              ),
            )}
          </ul>
        </div>

        <FormFooter>
          <Button
            disabled={form.formState.isSubmitting}
            variant="secondary"
            type="button"
            onClick={() => dispatch({ type: "DECREMENT_STEP" })}
          >
            <ArrowIcon direction="left" className="h-4 w-4" />
            Back
          </Button>

          <Button disabled={form.formState.isSubmitting}>
            Next
            <ArrowIcon direction="right" className="h-4 w-4" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
