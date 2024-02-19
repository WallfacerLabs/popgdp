"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createApplicationSchema } from "./createApplicationSchema";
import { createApplicationAction } from "./createApplicationAction";

export default function CreateApplication({
  params,
}: {
  params: { id: string };
}) {
  const form = useForm<createApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      projectName: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full max-w-lg"
        onSubmit={form.handleSubmit(async (data) => {
          await createApplicationAction(data, Number(params.id));
        })}
      >
        <div>Create Application</div>

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="waveName">Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting}>Create</Button>
      </form>
    </Form>
  );
}
