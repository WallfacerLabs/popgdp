"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import { publishDraft } from "@/drizzle/queries/applications";

import { ApplicationWithComments } from "@/types/Application";
import { canPublishDraft } from "@/config/actionPermissions";

export async function publishDraftAction(
  application: Pick<ApplicationWithComments, "id" | "waveId" | "userId">,
) {
  const { validationErrorMessage } = await canPublishDraft(application);
  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  const updatedApplications = await publishDraft(application.id);
  if (updatedApplications.length === 0) {
    throw new Error("Application not found");
  }

  revalidatePath(
    urls.applications.preview({
      applicationId: application.id,
      waveId: application.waveId,
    }),
  );
}
