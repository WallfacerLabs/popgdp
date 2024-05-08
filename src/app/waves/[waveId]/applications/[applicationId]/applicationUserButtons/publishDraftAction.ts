"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import { publishDraft } from "@/drizzle/queries/applications";

import { type ApplicationId } from "@/types/Application";
import { canPublishDraft } from "@/config/actionPermissions";

interface PublishDraftActionArgs {
  applicationId: ApplicationId;
  waveId: number;
}

export async function publishDraftAction({
  applicationId,
  waveId,
}: PublishDraftActionArgs) {
  const { validationErrorMessage } = await canPublishDraft(applicationId);
  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  const updatedApplications = await publishDraft(applicationId);
  if (updatedApplications.length === 0) {
    throw new Error("Application not found");
  }

  revalidatePath(
    urls.applications.preview({
      applicationId,
      waveId,
    }),
  );
}
