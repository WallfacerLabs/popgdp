"use client";

import {
  imageSchema,
  specificLengthStringSchema,
} from "@/constants/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormCounter,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessages,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { PlusCircleIcon } from "@/components/icons/plusCircleIcon";
import {
  useStepsContext,
  useStepsDispatchContext,
} from "@/app/waves/[waveId]/applications/create/stepsProvider";

import { MemberField } from "./memberField";

const FORM_FIELD_PARAMS = {
  teamSummary: { min: 1, max: 280 },
};

export const teamInformationSchema = z.object({
  teamSummary: specificLengthStringSchema(
    "Team summary",
    FORM_FIELD_PARAMS.teamSummary,
  ),
  members: z.array(
    z.object({
      image: imageSchema.optional(),
      name: z.string(),
      position: z.string(),
    }),
  ),
});
export type TeamInformationSchema = z.infer<typeof teamInformationSchema>;

export function TeamInformation() {
  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  const form = useForm<TeamInformationSchema>({
    resolver: zodResolver(teamInformationSchema),
    defaultValues: {
      teamSummary: applicationData.teamSummary ?? "",
      members: applicationData.members ?? [],
    } satisfies TeamInformationSchema,
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
              ({ name, position }) => name !== "" && position !== "",
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
            <FormItem aria-required>
              <FormLabel>Team summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your team" />
              </FormControl>
              <FormMessages className="grid grid-cols-[1fr_auto]">
                <FormMessage />
                <FormCounter
                  className="col-start-2"
                  limit={FORM_FIELD_PARAMS.teamSummary.max}
                />
                <FormDescription className="col-span-2">
                  <p>Tell us about your team.</p>
                  <ul className="list-disc pl-4">
                    <li>Humanize your company</li>
                    <li>Increase transparency</li>
                    <li>Emphasize your organization’s strengths</li>
                  </ul>
                </FormDescription>
              </FormMessages>
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Members</FormLabel>
          {memberFields.length > 0 && (
            <ul className="flex flex-col gap-4 rounded-3xl border p-4">
              {memberFields.map((field, index) => (
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
            className="mt-2 w-full"
            onClick={() =>
              appendMember({ image: undefined, name: "", position: "" })
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
