"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ApplicationWithComments } from "@/types/Application";
import { type Comment } from "@/types/Comment";
import { Badge } from "@/components/ui/badge";
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
import { CheckIcon } from "@/components/icons/checkIcon";
import { InfoCircleIcon } from "@/components/icons/infoCircleIcon";

import { addCommentSchema, type AddCommentSchema } from "./addCommentSchema";
import { updateCommentAction } from "./commentActions";

interface CommentEditFormProps {
  application: ApplicationWithComments;
  comment: Comment;
  onEdit: () => void;
}

export function CommentEditForm({
  application,
  comment,
  onEdit,
}: CommentEditFormProps) {
  const isReview = comment.review?.isReview;

  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = form.handleSubmit(async ({ content }) => {
    await updateCommentAction({
      applicationId: application.id,
      commentId: comment.id,
      newContent: content,
    });
    form.reset();
    onEdit();
  });

  function handleCancel() {
    form.reset();
    onEdit();
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <Badge
          variant="gray"
          className="text-sm font-normal [&>svg]:h-4 [&>svg]:w-4"
        >
          <InfoCircleIcon className="h-4 w-4" />
          You are only able to provide additional information to your{" "}
          {isReview ? "review" : "comment"}. Original{" "}
          {isReview ? "review" : "comment"} cannot be changed.
        </Badge>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor onChange={field.onChange} size="small" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter className="mt-0 justify-start">
          <Button
            type="button"
            variant="secondary"
            disabled={form.formState.isSubmitting}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            disabled={form.formState.isSubmitting}
            onClick={handleSubmit}
          >
            Submit
            <CheckIcon />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
