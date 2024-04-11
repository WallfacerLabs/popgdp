"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { insertApplication } from "@/drizzle/queries/applications";

import { getUserId } from "@/lib/auth";

import { ApplicationData } from "../stepsProvider";

export async function createApplicationAction(
  application: ApplicationData,
  waveId: number,
  isDraft: boolean,
) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertApplication(
    {
      draft: isDraft,
      name: application.name,
      summary: application.summary,
      entityName: application.entityName,
      email: application.email,
      duration: application.duration,
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
