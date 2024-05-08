import Link from "next/link";
import { urls } from "@/constants/urls";

import { ApplicationWithComments } from "@/types/Application";
import { canEditSubmission, canPublishDraft } from "@/config/actionPermissions";
import { Button } from "@/components/ui/button";
import { ErrorTooltip } from "@/components/ui/tooltip";
import { EditSquareIcon } from "@/components/icons/editSquareIcon";

import { publishDraftAction } from "./publishDraftAction";

export async function ApplicationUserButtons({
  application,
}: {
  application: ApplicationWithComments;
}) {
  const { draft } = application;
  const { validationErrorMessage: publishValidationErrorMessage } =
    await canPublishDraft(application);
  const { validationErrorMessage: editValidationErrorMessage } =
    await canEditSubmission(application);
  const isPublishDisabled = !draft && Boolean(publishValidationErrorMessage);
  const canEdit = !editValidationErrorMessage;

  return (
    <>
      {draft && (
        <form
          className="flex"
          action={async () => {
            "use server";
            await publishDraftAction(application);
          }}
        >
          <Button disabled={isPublishDisabled}>Publish</Button>
        </form>
      )}

      {canEdit ? (
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
      ) : (
        <ErrorTooltip message={editValidationErrorMessage}>
          <Button disabled>
            Edit
            <EditSquareIcon />
          </Button>
        </ErrorTooltip>
      )}
    </>
  );
}
