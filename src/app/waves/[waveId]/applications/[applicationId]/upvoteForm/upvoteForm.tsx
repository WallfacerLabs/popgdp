import { getApplicationValue } from "@/drizzle/queries/applicationValues";

import { auth } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";

import { upvoteAction } from "./upvoteAction";

type UpvoteFormProps = ApplicationParamsSchema;

export async function UpvoteForm({ applicationId, waveId }: UpvoteFormProps) {
  const session = await auth();
  const applicationValue = await getApplicationValue({
    applicationId,
    userId: session?.user?.id,
  });

  const isUpvoted = applicationValue === "positive";

  return (
    <form
      action={async () => {
        "use server";
        await upvoteAction({ session, applicationId, waveId, isUpvoted });
      }}
    >
      <Button
        className="px-16"
        variant={isUpvoted ? "secondary" : "primary"}
        disabled={!session?.user?.id}
      >
        {isUpvoted ? "Upvoted" : "Upvote"}
      </Button>
    </form>
  );
}
