import { getCommentValue } from "@/drizzle/queries/commentValues";

import { auth } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";

import { commentValueAction } from "./commentValueAction";

interface CommentValueFormProps extends ApplicationParamsSchema {
  commentId: string;
}

export async function CommentValueForm({
  applicationId,
  waveId,
  commentId,
}: CommentValueFormProps) {
  const session = await auth();
  const applicationValue = await getCommentValue({
    commentId,
    userId: session?.user?.id,
  });

  const isUpvoted = applicationValue === "positive";
  const isSpam = applicationValue === "spam";

  return (
    <form className="ml-auto flex gap-4">
      <Button
        variant="outline"
        formAction={async () => {
          "use server";
          await commentValueAction({
            commentId,
            session,
            applicationId,
            waveId,
            isChecked: isSpam,
            value: "spam",
          });
        }}
      >
        {isSpam ? "Marked as SPAM" : "Report SPAM"}
      </Button>
      <Button
        variant="outline"
        disabled={!session?.user?.id}
        formAction={async () => {
          "use server";
          await commentValueAction({
            commentId,
            session,
            applicationId,
            waveId,
            isChecked: isUpvoted,
            value: "positive",
          });
        }}
      >
        {isUpvoted ? "Upvoted" : "Upvote"}
      </Button>
    </form>
  );
}
