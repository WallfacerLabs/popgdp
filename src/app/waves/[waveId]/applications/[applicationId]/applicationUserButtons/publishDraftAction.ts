"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import { publishDraft } from "@/drizzle/queries/applications";

import { ApplicationWithComments } from "@/types/Application";
import { canPublishDraft } from "@/config/actionPermissions";

export async function publishDraftAction({
  application,
}: {
  application: ApplicationWithComments;
}) {
  const { validationErrorMessage } = await canPublishDraft(application);
  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await publishDraft(application.id);

  revalidatePath(
    urls.applications.preview({
      applicationId: application.id,
      waveId: application.waveId,
    }),
  );
}
