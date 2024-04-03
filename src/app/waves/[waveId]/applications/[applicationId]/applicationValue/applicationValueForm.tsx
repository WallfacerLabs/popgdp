import { getApplicationValue } from "@/drizzle/queries/applicationValues";

import { getUserId } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";

import { applicationValueAction } from "./applicationValueAction";

type ApplicationValueFormProps = ApplicationParamsSchema;

export async function ApplicationValueForm({
  applicationId,
  waveId,
}: ApplicationValueFormProps) {
  const userId = await getUserId();
  const applicationValue = await getApplicationValue({
    applicationId,
    userId,
  });

  const isUpvoted = applicationValue === "positive";
  const isSpam = applicationValue === "spam";

  return (
    <form className="flex gap-4">
      <Button
        variant={isSpam ? "secondary" : "outline"}
        disabled={!userId}
        formAction={async () => {
          "use server";
          await applicationValueAction({
            userId,
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
        className="px-16"
        variant={isUpvoted ? "secondary" : "primary"}
        disabled={!userId}
        formAction={async () => {
          "use server";
          await applicationValueAction({
            userId,
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
