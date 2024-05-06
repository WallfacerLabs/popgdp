import Link from "next/link";
import { urls } from "@/constants/urls";

import { ApplicationWithComments } from "@/types/Application";
import { canPublishDraft } from "@/config/actionPermissions";
import { Button } from "@/components/ui/button";
import { EditSquareIcon } from "@/components/icons/editSquareIcon";

import { publishDraftAction } from "./publishDraftAction";

export async function ApplicationUserButtons({
  application,
}: {
  application: ApplicationWithComments;
}) {
  const { draft } = application;
  const { validationErrorMessage } = await canPublishDraft(application);
  const isPublishDisabled = !draft && Boolean(validationErrorMessage);

  return (
    <div className="flex gap-4">
      {draft && (
        <form
          className="flex"
          action={async () => {
            "use server";
            await publishDraftAction({
              application,
            });
          }}
        >
          <Button disabled={isPublishDisabled}>Publish</Button>
        </form>
      )}

      <Button asChild>
        <Link
          href={urls.applications.edit({
            applicationId: application.id,
            waveId: application.waveId,
          })}
        >
          Edit
          <EditSquareIcon />
        </Link>
      </Button>
    </div>
  );
}
