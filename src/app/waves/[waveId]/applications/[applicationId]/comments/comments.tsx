import { Fragment } from "react";
import { ApplicationWithComments } from "@/drizzle/queries/applications";
import { cva, VariantProps } from "class-variance-authority";

import { formatDate } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/userAvatar";

import { AddCommentForm } from "./addCommentForm/addCommentForm";
import { parseMarkdown } from "./parseMarkdown";

interface CommentsProps {
  comments: ApplicationWithComments["comments"];
}

export async function Comments({ comments }: CommentsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-1">
        <h3 className="text-xl font-bold">Comments</h3>
        <span className="text-sm">({comments.length})</span>
      </div>

      <div>
        {comments.map((comment, i) => (
          <Fragment key={comment.id}>
            <Comment comment={comment} isReview={i % 2 === 0} />
            <Separator className="my-6 last:hidden" />
          </Fragment>
        ))}
      </div>

      <AddCommentForm />
    </div>
  );
}

interface CommentProps extends VariantProps<typeof commentContainerVariants> {
  comment: ApplicationWithComments["comments"][number];
}

export async function Comment({ comment, isReview }: CommentProps) {
  const commentHtml = await parseMarkdown(comment.content);

  return (
    <div className={commentContainerVariants({ isReview })}>
      {isReview && (
        <Badge variant="orange" className="mb-3">
          Review
        </Badge>
      )}
      <div className="flex gap-3">
        <UserAvatar name={comment.users.name} image={comment.users.image} />
        <div className="flex w-full flex-col justify-between gap-1">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: commentHtml }}
          />

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="font-bold">{comment.users.name}</span>

            <span className="text-foreground/60">Member</span>
            <span className="text-foreground/60">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const commentContainerVariants = cva("rounded-2xl px-2 pt-2 pb-4", {
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
