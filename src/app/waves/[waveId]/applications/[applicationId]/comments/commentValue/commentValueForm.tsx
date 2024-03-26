import { HTMLAttributes } from "react";
import { getCommentValue } from "@/drizzle/queries/commentValues";
import { cva } from "class-variance-authority";

import { getUserId } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { commentValueAction } from "./commentValueAction";

interface CommentValueFormProps
  extends ApplicationParamsSchema,
    Pick<HTMLAttributes<HTMLFormElement>, "className"> {
  commentId: string;
}

export async function CommentValueForm({
  applicationId,
  waveId,
  commentId,
  className,
}: CommentValueFormProps) {
  const userId = await getUserId();
  const applicationValue = await getCommentValue({
    commentId,
    userId,
  });

  const isUpvoted = applicationValue === "positive";
  const isSpam = applicationValue === "spam";

  return (
    <form className={cn("ml-auto flex items-center gap-2", className)}>
      <Button
        variant="link"
        className={commentButtonVariants({ isActive: isSpam })}
        aria-label={isSpam ? "Unmark as SPAM" : "Mark as SPAM"}
        formAction={async () => {
          "use server";
          await commentValueAction({
            commentId,
            userId,
            applicationId,
            waveId,
            isChecked: isSpam,
            value: "spam",
          });
        }}
      >
        <ErrorCircleIcon />
        {isSpam ? "Marked as SPAM" : "SPAM"}
      </Button>
      <Separator orientation="vertical" className="h-8 bg-primary opacity-10" />
      <Button
        variant="link"
        className={commentButtonVariants({ isActive: isUpvoted })}
        aria-label={isSpam ? "Unmark as helpful" : "Mark as helpful"}
        disabled={!userId}
        formAction={async () => {
          "use server";
          await commentValueAction({
            commentId,
            userId,
            applicationId,
            waveId,
            isChecked: isUpvoted,
            value: "positive",
          });
        }}
      >
        <ThumbUpIcon />
        {isUpvoted ? "Marked as helpful" : "Helpful"}
      </Button>
    </form>
  );
}

const commentButtonVariants = cva(
  cn(
    "h-8 p-2 py-0 transition-all",
    "before:bg-primary/0 hover:opacity-100 focus-visible:opacity-100",
  ),
  {
    variants: {
      isActive: {
        true: "font-bold",
        false: "opacity-60",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);
