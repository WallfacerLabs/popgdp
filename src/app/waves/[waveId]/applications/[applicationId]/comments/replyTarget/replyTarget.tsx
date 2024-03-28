import {
  ApplicationWithComments,
  getApplicationWithComments,
} from "@/drizzle/queries/applications";
import { cva } from "class-variance-authority";

import { UserId } from "@/lib/auth";
import { formatTime } from "@/lib/dates";
import { UserAvatar } from "@/components/ui/userAvatar";

import { CommentContent } from "../commentContent";

interface ReplyTargetProps {
  userId: UserId | undefined;
  comment: ApplicationWithComments["comments"][number];
}

export async function ReplyTarget({ userId, comment }: ReplyTargetProps) {
  const { replyTargetId, applicationId } = comment;
  const application = await getApplicationWithComments(applicationId, userId);

  const replyTarget = application?.comments.find(
    (comment) => comment.id === replyTargetId,
  );

  if (!replyTarget) {
    return null;
  }

  const { user, createdAt, review } = replyTarget;

  return (
    <div className="relative pl-9 pr-4">
      <div className="absolute left-7 top-1/2 h-8 w-4 rounded border-l border-t" />
      <div className="flex items-center gap-2">
        <UserAvatar image={user.image} size="small" />
        <div className="flex max-w-full items-center gap-2 overflow-hidden border-b py-0.5 text-xs">
          <span className="font-bold">{user.name}</span>
          <div className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
          <div className={replyTargetVariants({ isReview: review?.isReview })}>
            <CommentContent
              comment={replyTarget}
              className="pointer-events-none max-w-full select-none overflow-hidden text-ellipsis text-nowrap text-xs [&_ol]:m-0 [&_ol]:inline-flex [&_ol]:p-0 [&_p]:inline [&_ul]:m-0 [&_ul]:inline-flex [&_ul]:p-0"
            />
          </div>
          <div className="h-0.5 w-0.5 rounded-full bg-primary opacity-60" />
          <span className="text-nowrap opacity-60">
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

const replyTargetVariants = cva(
  "max-w-full overflow-hidden rounded-full px-1.5",
  {
    variants: {
      isReview: {
        true: "bg-orange/50",
        false: "bg-primary/10",
      },
    },
    defaultVariants: {
      isReview: false,
    },
  },
);
