"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { urls } from "@/constants/urls";
import { insertApplication } from "@/drizzle/queries/applications";

import { canAddSubmission } from "@/config/actionPermissions";

import { ApplicationData } from "../stepsProvider";

export async function createApplicationAction(
  application: ApplicationData,
  waveId: number,
  isDraft: boolean,
) {
  const { userId, validationErrorMessage } = await canAddSubmission({ waveId });

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await insertApplication(
    {
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
    },
    application.members.map((member) => ({
      imageId: member.image?.id,
      name: member.name,
      position: member.position,
    })),
  );

  revalidatePath(urls.waves.preview({ waveId }));
  redirect(urls.waves.preview({ waveId }));
}
