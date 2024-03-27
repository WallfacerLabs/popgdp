import { ApplicationWithComments } from "@/drizzle/queries/applications";

import { UserId } from "@/lib/auth";

import { CommentReplyForm } from "../addCommentForm/commentReplyForm";
import { CommentValueForm } from "../commentValue/commentValueForm";
import { CommentContent } from "./commentContent";
import { CommentPreview } from "./commentPreview";

export interface CommentProps {
  comment: ApplicationWithComments["comments"][number];
  waveId: number;
  userId: UserId | undefined;
}

export const Comment = ({ comment, waveId, userId }: CommentProps) => {
  return (
    <CommentPreview
      comment={comment}
      commentContent={<CommentContent comment={comment} />}
      commentValueForm={
        <CommentValueForm
          className="ml-auto"
          applicationId={comment.applicationId}
          waveId={waveId}
          commentId={comment.id}
          commentValue={comment.commentValues[0]?.value}
          userId={userId}
        />
      }
      commentReplyForm={
        <CommentReplyForm
          applicationId={comment.applicationId}
          waveId={waveId}
          replyTargetId={comment.id}
        />
      }
    />
  );
};
