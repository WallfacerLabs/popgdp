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
import { PlusCircleIcon } from "@/components/icons/plusCircleIcon";
import {
  useStepsContext,
  useStepsDispatchContext,
} from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { MemberField } from "./memberField";

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
      members: applicationData.members ?? [],
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
        onSubmit={form.handleSubmit(async ({ teamSummary, members }) => {
          const payload = {
            teamSummary,
            members: members.filter(
              ({ imageId, name, position }) =>
                imageId !== "" && name !== "" && position !== "",
            ),
          };
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
          {memberFields.length > 0 && (
            <ul className="flex flex-col gap-4 rounded-3xl border p-4">
              {memberFields.map((field, index, array) => (
                <MemberField
                  key={field.id}
                  form={form}
                  index={index}
                  removeMember={removeMember}
                />
              ))}
            </ul>
          )}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              appendMember({ imageId: "", name: "", position: "" })
            }
          >
            <PlusCircleIcon />
            Add member
          </Button>
        </div>

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
            Next
            <ArrowIcon direction="right" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
