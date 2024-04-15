import { ApplicationWithComments } from "@/types/Application";
import { canPublishDraft } from "@/config/actionPermissions";
import { Button } from "@/components/ui/button";

import { publishDraftAction } from "./publishDraftAction";

export async function ApplicationUserButtons({
  application,
}: {
  application: ApplicationWithComments;
}) {
  const { draft } = application;
  const { validationErrorMessage } = await canPublishDraft(application);
  const canPublish = draft && !!validationErrorMessage;

  return canPublish ? (
    <form
      action={async () => {
        "use server";
        await publishDraftAction({
          application,
        });
      }}
    >
      <Button> Publish</Button>
    </form>
  ) : (
    <></>
  );
}
