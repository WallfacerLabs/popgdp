import { cva } from "class-variance-authority";
import { useForm } from "react-hook-form";

import { Comment } from "@/types/Comment";
import { type UserId } from "@/types/User";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { commentValueAction } from "./commentValueAction";

interface CommentValueFormProps {
  comment: Comment;
  waveId: number;
  userId: UserId | undefined;
  className?: string;
}

export function CommentValueForm({
  comment,
  waveId,
  className,
  userId,
}: CommentValueFormProps) {
  const form = useForm();

  const isUpvoted = comment.commentValues[0]?.value === "positive";
  const isSpam = comment.commentValues[0]?.value === "spam";

  const ownComment = userId === comment.userId;

  const isVotingDisabled = !userId || form.formState.isSubmitting || ownComment;

  const onSpamClick = form.handleSubmit(async () => {
    if (!ownComment) {
      await commentValueAction({
        commentId: comment.id,
        userId,
        applicationId: comment.applicationId,
        waveId,
        isChecked: isSpam,
        value: "spam",
      });
    }
  });

  const onHelpfulClick = form.handleSubmit(async () => {
    if (!ownComment) {
      await commentValueAction({
        commentId: comment.id,
        userId,
        applicationId: comment.applicationId,
        waveId,
        isChecked: isUpvoted,
        value: "positive",
      });
    }
  });

  return (
    <form className={cn("ml-auto flex items-center gap-2", className)}>
      <Button
        variant="link"
        className={commentButtonVariants({ isActive: isSpam })}
        aria-label={isSpam ? "Unmark as SPAM" : "Mark as SPAM"}
        disabled={isVotingDisabled}
        onClick={onSpamClick}
      >
        <ErrorCircleIcon />
        {isSpam ? "Marked as SPAM" : "SPAM"}
      </Button>

      <Separator orientation="vertical" className="h-8 bg-primary opacity-10" />

      <Button
        variant="link"
        className={commentButtonVariants({ isActive: isUpvoted })}
        aria-label={isSpam ? "Unmark as helpful" : "Mark as helpful"}
        disabled={isVotingDisabled}
        onClick={onHelpfulClick}
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
