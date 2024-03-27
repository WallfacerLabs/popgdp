import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AvatarUpload } from "@/components/ui/uploads/avatarUpload";
import { CrossIcon } from "@/components/icons/crossIcon";

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
  return (
    <li className="flex items-end gap-4">
      <FormField
        control={form.control}
        name={`members.${index}.image`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AvatarUpload image={field.value} onChange={field.onChange} />
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
