"use client";

import { useState } from "react";
import { cva } from "class-variance-authority";

import { type ApplicationWithComments } from "@/types/Application";
import {
  COMMENT_SECTIONS,
  CommentSection,
  type Comment,
} from "@/types/Comment";
import { type UserId } from "@/types/User";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReplyIcon } from "@/components/icons/replyIcon";

import { CommentReplyForm } from "../addCommentForm/commentReplyForm";
import { CommentValueForm } from "../commentValue/commentValueForm";
import { ReplyTarget } from "../replyTarget/replyTarget";
import { CommentBody } from "./commentBody";
import { RepliesList } from "./repliesList";

interface CommentPreviewProps {
  application: ApplicationWithComments;
  comment: Comment;
  userId: UserId | undefined;
  addCommentValidationError: string | undefined;
  rateCommentValidationError: string | undefined;
  section: CommentSection;
}

export const CommentPreview = ({
  application,
  comment,
  userId,
  addCommentValidationError,
  rateCommentValidationError,
  section,
}: CommentPreviewProps) => {
  const { waveId, comments: allComments } = application;
  const { review, user, replyTargetId, createdAt, id } = comment;

  const isReview = review?.isReview;
  const [isReply, setIsReply] = useState(false);

  const reviewReplies: Comment[] = allComments.filter(
    (reply) => reply.replyTargetId === comment.id,
  );

  function onReply() {
    setIsReply(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {replyTargetId && (
          <ReplyTarget comment={comment} allComments={allComments} />
        )}
        <div className={commentContainerVariants({ isReview })}>
          {isReview && (
            <Badge variant="orange" className="flex w-fit">
              Review
            </Badge>
          )}
          <div className="flex gap-4">
            <CommentBody comment={comment} />
            <Button
              variant="link"
              className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
              onClick={() => setIsReply(true)}
            >
              <ReplyIcon />
              Reply
            </Button>
          </div>
          <CommentValueForm
            className="ml-auto"
            comment={comment}
            waveId={waveId}
            userId={userId}
          />
        </div>
      </div>
      {isReply && (
        <CommentReplyForm
          application={application}
          replyTargetId={id}
          onReply={onReply}
        />
      )}
      {isReview && section === COMMENT_SECTIONS.reviews && (
        <RepliesList replies={reviewReplies} />
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
