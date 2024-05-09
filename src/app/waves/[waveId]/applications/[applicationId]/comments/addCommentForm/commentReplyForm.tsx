"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { addCommentSchema, type AddCommentSchema } from "./addCommentSchema";
import { addReplyAction, AddReplyActionPayload } from "./commentActions";

interface CommentReplyFormProps
  extends Pick<
    AddReplyActionPayload,
    "replyTargetId" | "applicationId" | "waveId"
  > {
  onReply: () => void;
}

export function CommentReplyForm({
  applicationId,
  waveId,
  replyTargetId,
  onReply,
}: CommentReplyFormProps) {
  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = form.handleSubmit(async ({ content }) => {
    await addReplyAction({ content, applicationId, waveId, replyTargetId });
    form.reset();
    onReply();
  });

  function handleCancel() {
    form.reset();
    onReply();
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
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
            Reply
            <AddCommentIcon />
          </Button>
        </FormFooter>
      </form>
    </Form>
  );
}
