"use client";

import { ReactNode, useState } from "react";
import { cva } from "class-variance-authority";

import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/userAvatar";
import { ReplyIcon } from "@/components/icons/replyIcon";

import { CommentProps } from "./comment";

interface CommentPreviewProps extends Omit<CommentProps, "waveId" | "userId"> {
  commentContent: ReactNode;
  commentValueForm: ReactNode;
}

export const CommentPreview = ({
  comment,
  commentContent,
  commentValueForm,
}: CommentPreviewProps) => {
  const [isReply, setIsReply] = useState(false);
  const isReview = comment.review?.isReview;

  return (
    <article className={commentContainerVariants({ isReview })}>
      {isReview && (
        <Badge variant="orange" className="flex w-fit">
          Review
        </Badge>
      )}
      <div className="flex gap-3">
        <UserAvatar name={comment.user.name} image={comment.user.image} />
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold">{comment.user.name}</span>
              <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
              <span className="opacity-60">Member</span>
              <Separator className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
              <span className="opacity-60">
                {formatTime(comment.createdAt)}
              </span>
            </div>
            <Button
              variant="link"
              className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
              onClick={() => setIsReply(true)}
            >
              <ReplyIcon />
              Reply {isReply && "ing"}
            </Button>
          </div>
          {commentContent}
          {commentValueForm}
        </div>
      </div>
    </article>
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
