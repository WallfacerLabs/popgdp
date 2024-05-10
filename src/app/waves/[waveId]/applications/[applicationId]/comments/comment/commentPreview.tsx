"use client";

import { useState } from "react";
import { cva } from "class-variance-authority";

import { type ApplicationWithComments } from "@/types/Application";
import { type Comment } from "@/types/Comment";
import { type UserId } from "@/types/User";
import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownPreview } from "@/components/ui/markdownPreview";
import { Separator } from "@/components/ui/separator";
import { ErrorTooltip } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/ui/userAvatar";
import { EditSquareIcon } from "@/components/icons/editSquareIcon";
import { ReplyIcon } from "@/components/icons/replyIcon";

import { CommentEditForm } from "../addCommentForm/commentEditForm";
import { CommentReplyForm } from "../addCommentForm/commentReplyForm";
import { CommentValueForm } from "../commentValue/commentValueForm";
import { ReplyTarget } from "../replyTarget/replyTarget";

interface CommentPreviewProps {
  application: ApplicationWithComments;
  comment: Comment;
  userId: UserId | undefined;
  addCommentValidationError: string | undefined;
  editCommentValidationError: string | undefined;
  rateCommentValidationError: string | undefined;
}

export const CommentPreview = ({
  application,
  comment,
  userId,
  addCommentValidationError,
  editCommentValidationError,
  rateCommentValidationError,
}: CommentPreviewProps) => {
  const { waveId, comments: allComments } = application;
  const { review, user, replyTargetId, createdAt, id } = comment;

  const isReview = review?.isReview;
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function onReply() {
    setIsReply(false);
  }

  function onEdit() {
    setIsEdit(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {replyTargetId && (
          <ReplyTarget comment={comment} allComments={allComments} />
        )}
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
                <div className="flex items-center gap-1">
                  <ErrorTooltip message={editCommentValidationError}>
                    <Button
                      disabled={!!editCommentValidationError}
                      variant="link"
                      className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
                      onClick={() => setIsEdit(true)}
                    >
                      <EditSquareIcon />
                      Edit
                    </Button>
                  </ErrorTooltip>
                  <Separator
                    orientation="vertical"
                    className="h-6 bg-primary opacity-10"
                  />
                  <ErrorTooltip message={addCommentValidationError}>
                    <Button
                      disabled={!!addCommentValidationError}
                      variant="link"
                      className="h-6 p-2 py-0 opacity-60 transition-opacity before:opacity-0 hover:opacity-100 focus-visible:opacity-100"
                      onClick={() => setIsReply(true)}
                    >
                      <ReplyIcon />
                      Reply
                    </Button>
                  </ErrorTooltip>
                </div>
              </div>

              <MarkdownPreview body={comment.markdownContent} />
              <CommentValueForm
                className="ml-auto"
                comment={comment}
                waveId={waveId}
                userId={userId}
                rateCommentValidationError={rateCommentValidationError}
              />
            </div>
          </div>
        </article>
      </div>
      {isReply && (
        <CommentReplyForm
          applicationId={application.id}
          waveId={application.waveId}
          replyTargetId={id}
          onReply={onReply}
        />
      )}
      {isEdit && (
        <CommentEditForm
          application={application}
          comment={comment}
          onEdit={onEdit}
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
