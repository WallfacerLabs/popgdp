"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/constants/urls";
import { updateApplication } from "@/drizzle/queries/applications";

import { canAddSubmission } from "@/config/actionPermissions";

import { ApplicationData } from "../../../create/stepsProvider";

export async function updateDraftAction(
  application: ApplicationData,
  waveId: number,
  isDraft: boolean,
) {
  const { userId, validationErrorMessage } = await canAddSubmission({ waveId });

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await updateApplication({
    draft: isDraft,
    name: application.name,
    summary: application.summary,
    entityName: application.entityName,
    email: application.email,
    duration: String(application.duration),
    budget: application.budget,
    categoryId: application.categoryId,

    teamSummary: application.teamSummary,

    idea: application.idea,
    reason: application.reason,
    state: application.state,
    goals: application.goals,
    requirements: application.requirements,

    tbd: application.tbd,

    imageId: application.image?.id,
    waveId,
    userId,
  });

  revalidatePath(urls.waves.preview({ waveId }));
  redirect(urls.waves.preview({ waveId }));
}
