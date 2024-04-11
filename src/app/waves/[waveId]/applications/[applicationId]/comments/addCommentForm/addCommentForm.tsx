"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { parseApplicationParams } from "@/lib/paramsValidation";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddCommentIcon } from "@/components/icons/addCommentIcon";

import {
  addCommentAction,
  addReviewAction,
  type AddCommentActionPayload,
} from "./addCommentAction";
import { addCommentSchema, type AddCommentSchema } from "./addCommentSchema";
import { AddReviewDialog } from "./addReviewDialog";

interface AddCommentFormProps {
  reviewValidationError: string | undefined;
  commentValidationError: string | undefined;
}

export function AddCommentForm({
  reviewValidationError,
  commentValidationError,
}: AddCommentFormProps) {
  const { waveId, applicationId } = parseApplicationParams(useParams());

  const [editorKey, setEditorKey] = useState(0);
  const form = useForm<AddCommentSchema>({
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="self-end"
                disabled={
                  form.formState.isSubmitting || !!commentValidationError
                }
                onClick={handleSubmit(addCommentAction)}
              >
                Add comment
                <AddCommentIcon />
              </Button>
            </TooltipTrigger>
            {commentValidationError && (
              <TooltipContent>{commentValidationError}</TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <AddReviewDialog
                validationError={reviewValidationError}
                onSubmit={handleSubmit(addReviewAction)}
              />
            </TooltipTrigger>
            {reviewValidationError && (
              <TooltipContent>{reviewValidationError}</TooltipContent>
            )}
          </Tooltip>
        </FormFooter>
      </form>
    </Form>
  );
}
