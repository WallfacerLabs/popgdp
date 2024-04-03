"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ApplicationParamsSchema } from "@/lib/paramsValidation";
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

import { addReplyAction, AddReplyACtionPayload } from "./addCommentAction";
import { addCommentSchema, type AddCommentSchema } from "./addCommentSchema";

interface CommentReplyFormProps
  extends ApplicationParamsSchema,
    Pick<AddReplyACtionPayload, "replyTargetId"> {
  onReply: () => void;
}

export function CommentReplyForm({
  waveId,
  applicationId,
  replyTargetId,
  onReply,
}: CommentReplyFormProps) {
  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await addReplyAction({ data, waveId, applicationId, replyTargetId });
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
          name="comment"
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
