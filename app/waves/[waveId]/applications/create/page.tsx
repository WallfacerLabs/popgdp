"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createApplicationAction } from "./createApplicationAction";
import { createApplicationSchema } from "./createApplicationSchema";

export default function CreateApplication({
  params,
}: {
  params: { waveId: string };
}) {
  const form = useForm<createApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      projectName: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          await createApplicationAction(data, Number(params.waveId));
        })}
      >
        <div>Create Application</div>

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting}>Create</Button>
      </form>
    </Form>
  );
}
