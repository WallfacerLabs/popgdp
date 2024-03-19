"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApplicationParams } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor/editor";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AddCommentIcon } from "@/components/icons/addCommentIcon";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";

import {
  addCommentAction,
  addReviewAction,
  type AddCommentActionPayload,
} from "./addCommentAction";
import { addCommentSchema } from "./addCommentSchema";

export function AddCommentForm() {
  const { waveId, applicationId } = useApplicationParams();

  const [editorKey, setEditorKey] = useState(0);
  const form = useForm<addCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = (
    action: (payload: AddCommentActionPayload) => Promise<void>,
  ) =>
    form.handleSubmit(async (data) => {
      await action({ data, waveId, applicationId });
      setEditorKey((prev) => prev + 1);
      form.reset();
    });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor onChange={field.onChange} key={editorKey} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter className="mt-0 justify-start">
          <Button
            variant="secondary"
            className="self-end"
            disabled={form.formState.isSubmitting}
            onClick={handleSubmit(addCommentAction)}
          >
            Add comment
            <AddCommentIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            className="self-end"
            disabled={form.formState.isSubmitting}
            onClick={handleSubmit(addReviewAction)}
          >
            Add review
            <AssignmentIcon className="h-4 w-4" />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
