import { cva } from "class-variance-authority";
import { useForm } from "react-hook-form";

import { type Comment } from "@/types/Comment";
import { ContentValue } from "@/types/ContentValue";
import { type UserId } from "@/types/User";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

import { commentValueAction } from "./commentValueAction";

interface CommentValueFormProps {
  rateCommentValidationError: string | undefined;
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
  rateCommentValidationError,
}: CommentValueFormProps) {
  const form = useForm();

  const isUpvoted = comment.commentValues[0]?.value === ContentValue.positive;
  const isSpam = comment.commentValues[0]?.value === ContentValue.spam;

  const isCommentator = userId === comment.userId;

  const isVotingDisabled =
    !!rateCommentValidationError || form.formState.isSubmitting;

  if (isCommentator) {
    return;
  }

  const handleAction = (value: ContentValue, isChecked: boolean) =>
    form.handleSubmit(async () => {
      await commentValueAction({
        commentId: comment.id,
        commentatorId: comment.userId,
        applicationId: comment.applicationId,
        waveId,
        isChecked,
        value,
      });
    });

  return (
    <form className={cn("ml-auto flex items-center gap-2", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            className={commentButtonVariants({ isActive: isSpam })}
            aria-label={isSpam ? "Unmark as SPAM" : "Mark as SPAM"}
            disabled={isVotingDisabled}
            onClick={handleAction("spam", isSpam)}
          >
            <ErrorCircleIcon />
            {isSpam ? "Marked as SPAM" : "SPAM"}
          </Button>
        </TooltipTrigger>
        {rateCommentValidationError && (
          <TooltipContent>{rateCommentValidationError}</TooltipContent>
        )}
      </Tooltip>

      <Separator orientation="vertical" className="h-8 bg-primary opacity-10" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            className={commentButtonVariants({ isActive: isUpvoted })}
            aria-label={isUpvoted ? "Unmark as helpful" : "Mark as helpful"}
            disabled={isVotingDisabled}
            onClick={handleAction("positive", isUpvoted)}
          >
            <ThumbUpIcon />
            {isUpvoted ? "Marked as helpful" : "Helpful"}
          </Button>
        </TooltipTrigger>
        {rateCommentValidationError && (
          <TooltipContent>{rateCommentValidationError}</TooltipContent>
        )}
      </Tooltip>
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
