"use client";

import { useState } from "react";
import { DURATIONS } from "@/constants/durations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type ApplicationWithComments } from "@/types/Application";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
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
import { ErrorTooltip } from "@/components/ui/tooltip";
import { AddCommentIcon } from "@/components/icons/addCommentIcon";

import { addCommentSchema, type AddCommentSchema } from "./addCommentSchema";
import { AddReviewDialog } from "./addReviewDialog";
import {
  addCommentAction,
  addReviewAction,
  type AddCommentActionPayload,
} from "./commentActions";

interface AddCommentFormProps {
  application: ApplicationWithComments;
  reviewValidationError: string | undefined;
  commentValidationError: string | undefined;
}

export function AddCommentForm({
  application,
  reviewValidationError,
  commentValidationError,
}: AddCommentFormProps) {
  const [editorKey, setEditorKey] = useState(0);
  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleDebouncedChange = useDebounceCallback((value: string) => {
    console.log("form:", form);
    console.log("value: ", value);
  }, DURATIONS.commentDebounce);

  const handleSubmit = (
    action: (payload: AddCommentActionPayload) => Promise<void>,
  ) =>
    form.handleSubmit(async ({ content }) => {
      await action({
        content,
        applicationId: application.id,
        waveId: application.waveId,
      });
      setEditorKey((prev) => prev + 1);
      form.reset();
    });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  onChange={(value) => {
                    field.onChange(value);
                    handleDebouncedChange(value);
                  }}
                  key={editorKey}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter className="mt-0 justify-start">
          <ErrorTooltip message={commentValidationError}>
            <Button
              variant="secondary"
              className="self-end"
              disabled={form.formState.isSubmitting || !!commentValidationError}
              onClick={handleSubmit(addCommentAction)}
            >
              Add comment
              <AddCommentIcon />
            </Button>
          </ErrorTooltip>

          <AddReviewDialog
            validationError={reviewValidationError}
            onSubmit={handleSubmit(addReviewAction)}
          />
        </FormFooter>
      </form>
    </Form>
  );
}
