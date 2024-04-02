"use client";

import {
  ImageData,
  imageSchema,
  specificLengthStringSchema,
} from "@/constants/validationSchemas";
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
  FormMessages,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AvatarUpload } from "@/components/ui/uploads/avatarUpload";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import { updateUserDetailsAction } from "./updateUserDetailsAction";

const FORM_FIELD_PARAMS = {
  nickname: { min: 3, max: 15 },
};

const profileDetailsSchema = z.object({
  avatar: imageSchema.optional(),
  nickname: specificLengthStringSchema("Nickname", FORM_FIELD_PARAMS.nickname),
});
export type ProfileDetailsSchema = z.infer<typeof profileDetailsSchema>;

interface UserDetailsFormProps {
  userName: string | undefined | null;
  userAvatar: ImageData | null | undefined;
  incrementStep: () => void;
}

export function UserDetailsForm({
  userAvatar,
  userName,
  incrementStep,
}: UserDetailsFormProps) {
  const form = useForm<ProfileDetailsSchema>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      nickname: userName ?? "",
      avatar: userAvatar ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (userData) => {
          await updateUserDetailsAction(userData);
          incrementStep();
        })}
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarUpload
                  className="h-48 w-48"
                  image={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessages>
                <FormMessage />
                <FormCounter limit={FORM_FIELD_PARAMS[field.name].max} />
              </FormMessages>
            </FormItem>
          )}
        />

        <FormFooter className="justify-end">
          <Button>
            Next <ArrowIcon />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
