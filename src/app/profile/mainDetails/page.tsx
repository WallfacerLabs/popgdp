"use client";

import {
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
import { TeamIcon } from "@/components/icons/teamIcon";

import { updateUserDetailsAction } from "./updateUserDetailsAction";

const FORM_FIELD_PARAMS = {
  nickname: { min: 3, max: 15 },
};

const profileDetailsSchema = z.object({
  avatar: imageSchema.optional(),
  nickname: specificLengthStringSchema("Nickname", FORM_FIELD_PARAMS.nickname),
});
export type ProfileDetailsSchema = z.infer<typeof profileDetailsSchema>;

export default function MainDetailsPage() {
  const form = useForm<ProfileDetailsSchema>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      nickname: "",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-6 py-2">
      <div className="flex items-center gap-2">
        <TeamIcon className="h-6 w-6" />
        <span className="font-bold">Main details</span>
      </div>

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-6"
          onSubmit={form.handleSubmit((userData) => {
            updateUserDetailsAction(userData);
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
              <FormItem>
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
            <Button>Save</Button>
          </FormFooter>
        </form>
      </Form>
    </div>
  );
}
