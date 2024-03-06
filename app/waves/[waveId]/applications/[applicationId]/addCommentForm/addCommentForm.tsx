"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApplicationParams } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { addCommentAction } from "./addCommentAction";
import { addCommentSchema } from "./addCommentSchema";

export function AddCommentForm() {
  const { waveId, applicationId } = useApplicationParams();

  const form = useForm<addCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  return (
    <Form {...form}>
      <h2>Add new comment</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          await addCommentAction(data, waveId, applicationId);
        })}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="self-end" disabled={form.formState.isSubmitting}>
          Add comment
        </Button>
      </form>
    </Form>
  );
}
