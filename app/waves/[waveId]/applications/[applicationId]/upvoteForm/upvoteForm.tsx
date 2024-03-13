import { getApplicationValue } from "@/drizzle/queries/applicationValues";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

import { upvoteAction } from "./upvoteAction";

interface UpvoteFormProps {
  applicationId: number;
  waveId: number;
}

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
        await upvoteAction({ applicationId, waveId, isUpvoted });
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
