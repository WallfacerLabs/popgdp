"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/constants/urls";
import { updateApplication } from "@/drizzle/queries/applications";

import { type ApplicationId } from "@/types/Application";
import { canEditSubmission } from "@/config/actionPermissions";
import { type ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

interface UpdateDraftActionArgs {
  applicationId: ApplicationId;
  applicationData: ApplicationData;
  isDraft: boolean;
  waveId: number;
}

export async function updateDraftAction({
  applicationId,
  applicationData,
  isDraft,
  waveId,
}: UpdateDraftActionArgs) {
  const { validationErrorMessage } = await canEditSubmission(applicationId);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await updateApplication({
    draft: isDraft,
    name: applicationData.name,
    summary: applicationData.summary,
    entityName: applicationData.entityName,
    email: applicationData.email,
    duration: String(applicationData.duration),
    budget: applicationData.budget,
    categoryId: applicationData.categoryId,

    teamSummary: applicationData.teamSummary,

    idea: applicationData.idea,
    reason: applicationData.reason,
    state: applicationData.state,
    goals: applicationData.goals,
    requirements: applicationData.requirements,

    tbd: applicationData.tbd,

    imageId: applicationData.image?.id,
  });

  revalidatePath(urls.waves.preview({ waveId }));
  redirect(urls.waves.preview({ waveId }));
}
