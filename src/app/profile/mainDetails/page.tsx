"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AvatarUpload } from "@/components/ui/avatarUpload";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const profileDetailsSchema = z.object({
  avatarId: z.string().optional(),
});
type profileDetailsSchema = z.infer<typeof profileDetailsSchema>;

export default function MainDetailsPage() {
  const form = useForm<profileDetailsSchema>({
    resolver: zodResolver(profileDetailsSchema),
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="avatarId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarUpload
                  className="h-24 w-24"
                  imageId={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
