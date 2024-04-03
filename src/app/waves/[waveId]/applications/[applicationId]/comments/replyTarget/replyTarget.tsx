import { cva } from "class-variance-authority";

import { Comment } from "@/types/Comment";
import { formatTime } from "@/lib/dates";
import { MarkdownPreview } from "@/components/ui/markdownPreview";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/userAvatar";

interface ReplyTargetProps {
  comment: Comment;
  allComments: Comment[];
}

export async function ReplyTarget({ comment, allComments }: ReplyTargetProps) {
  const { replyTargetId } = comment;
  const replyTarget = allComments.find(
    (comment) => comment.id === replyTargetId,
  );

  if (!replyTarget) {
    return null;
  }

  const { user, createdAt, review } = replyTarget;

  return (
    <div className="relative border-b border-transparent pl-9 pr-4">
      <div className="absolute left-7 top-1/2 h-5 w-2 rounded-tl border-l border-t" />
      <div className="flex items-center gap-2">
        <UserAvatar image={user.image} size="small" />
        <div className="flex max-w-full items-center gap-2 overflow-hidden border-b py-0.5 text-xs">
          <span className="font-bold">{user.name}</span>
          <Separator orientation="dot" className="opacity-60" />
          <div className={replyTargetVariants({ isReview: review?.isReview })}>
            <MarkdownPreview
              body={replyTarget.markdownContent}
              className="max-w-full overflow-hidden text-ellipsis text-nowrap"
              variant="inline"
              size="xs"
              interactive={false}
            />
          </div>
          <Separator orientation="dot" className="opacity-60" />
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
