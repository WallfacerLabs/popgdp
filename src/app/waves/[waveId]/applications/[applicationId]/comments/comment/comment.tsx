import { ApplicationWithComments } from "@/drizzle/queries/applications";

import { UserId } from "@/lib/auth";

import { CommentContent } from "../commentContent";
import { CommentValueForm } from "../commentValue/commentValueForm";
import { ReplyTarget } from "../replyTarget/replyTarget";
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
      replyTargetPreview={<ReplyTarget comment={comment} userId={userId} />}
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
    />
  );
};
