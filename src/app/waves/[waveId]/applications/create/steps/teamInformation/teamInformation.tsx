"use client";

import { ChangeEvent, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarUpload } from "@/components/ui/avatarUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { CheckIcon } from "@/components/icons/checkIcon";
import { CrossIcon } from "@/components/icons/crossIcon";
import { useStepsContext, useStepsDispatchContext } from '@/app/waves/[waveId]/applications/create/stepsProvider';

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
      members: applicationData.members ?? [{ imageId: "", name: "", position: "" }]
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
                  id={field.id}
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

interface MemberFieldProps {
  form: UseFormReturn<teamInformationSchema>;
  id: string;
  index: number;
  appendMember: UseFieldArrayAppend<teamInformationSchema>;
}

const MemberField = ({ form, id, index, appendMember }: MemberFieldProps) => {
  const avatarUploadRef = useRef<HTMLInputElement>(null);

  async function onAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const avatarId = await uploadImage(formData);
      form.setValue(`members.${index}.imageId`, avatarId, {
        shouldValidate: true,
      });
    }
  }

  function onAvatarRemove() {
    form.setValue(`members.${index}.imageId`, "", {
      shouldValidate: true,
    });
    if (avatarUploadRef.current) {
      avatarUploadRef.current.value = "";
    }
  }

  return (
    <li key={id} className="flex items-end gap-4">
      <AvatarUpload
        ref={avatarUploadRef}
        imageId={form.watch(`members.${index}.imageId`)}
        onChange={onAvatarChange}
        onRemove={onAvatarRemove}
      />

      <FormField
        control={form.control}
        name={`members.${index}.imageId`}
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
        name={`members.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`members.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="outline"
        className="ml-auto h-10 w-10 p-0"
        onClick={() => appendMember({ imageId: "", name: "", position: "" })}
      >
        <CheckIcon className="h-6 w-6" />
      </Button>
    </li>
  );
};

interface MemberPreviewProps {
  member: teamInformationSchema["members"][number];
  index: number;
  removeMember: UseFieldArrayRemove;
}

const MemberPreview = ({ member, index, removeMember }: MemberPreviewProps) => {
  const { imageId, name, position } = member;
  return (
    <li className="flex w-full items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback />
          <AvatarImage
            src={imageId && `/api/images/${imageId}`}
            alt={`${name} avatar`}
          />
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-sm">{position}</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="ml-auto h-10 w-10 p-0"
        onClick={() => removeMember(index)}
      >
        <CrossIcon className="h-6 w-6" />
      </Button>
    </li>
  );
};
