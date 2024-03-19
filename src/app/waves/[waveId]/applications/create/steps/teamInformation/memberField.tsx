import { ChangeEvent, useRef } from "react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";

import { AvatarUpload } from "@/components/ui/avatarUpload";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CrossIcon } from "@/components/icons/crossIcon";

import { uploadImage } from "../uploadImageAction";
import { teamInformationSchema } from "./teamInformation";

interface MemberFieldProps {
  form: UseFormReturn<teamInformationSchema>;
  index: number;
  removeMember: UseFieldArrayRemove;
}

export const MemberField = ({
  form,
  index,
  removeMember,
}: MemberFieldProps) => {
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
    <li className="flex items-end gap-4">
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
        onClick={() => removeMember(index)}
      >
        <CrossIcon className="h-6 w-6" />
      </Button>
    </li>
  );
};
