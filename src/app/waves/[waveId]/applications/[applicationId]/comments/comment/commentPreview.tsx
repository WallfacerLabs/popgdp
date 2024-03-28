"use client";

import { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";

import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/userAvatar";
import { ReplyIcon } from "@/components/icons/replyIcon";

import { CommentReplyForm } from "../addCommentForm/commentReplyForm";
import { CommentProps } from "./comment";

interface CommentPreviewProps extends Omit<CommentProps, "waveId" | "userId"> {
  replyTargetPreview: ReactNode;
  commentContent: ReactNode;
  commentValueForm: ReactNode;
}

export const CommentPreview = ({
  comment,
  replyTargetPreview,
  commentContent,
  commentValueForm,
}: CommentPreviewProps) => {
  const { review, user, replyTargetId, createdAt, applicationId, id } = comment;

  const isReview = review?.isReview;
  const [isReply, setIsReply] = useState(false);

  function onReply() {
    setIsReply(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {replyTargetId && replyTargetPreview}
        <article className={commentContainerVariants({ isReview })}>
          {isReview && (
            <Badge variant="orange" className="flex w-fit">
              Review
            </Badge>
          )}
          <div className="flex gap-3">
            <UserAvatar image={user.image} />
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">{user.name}</span>
                  <Separator orientation="dot" className="opacity-60" />
                  <span className="opacity-60">Member</span>
                  <Separator orientation="dot" className="opacity-60" />
                  <span className="opacity-60">{formatTime(createdAt)}</span>
                </div>
                <Button
                  variant="link"
                  className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => setIsReply(true)}
                >
                  <ReplyIcon />
                  Reply
                </Button>
              </div>
              {commentContent}
              {commentValueForm}
            </div>
          </div>
        </article>
      </div>
      {isReply && (
        <CommentReplyForm
          applicationId={applicationId}
          waveId={1}
          replyTargetId={id}
          onReply={onReply}
        />
      )}
    </div>
  );
};

const commentContainerVariants = cva("flex flex-col gap-3 rounded-2xl p-2", {
  variants: {
    isReview: {
      true: "bg-orange/50",
      false: "",
    },
  },
  defaultVariants: {
    isReview: false,
  },
});
