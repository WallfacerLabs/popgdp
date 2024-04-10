"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { insertApplication } from "@/drizzle/queries/applications";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { canPerformActionByStage, getWaveStage } from "@/config/waveStages";
import { getUserId } from "@/lib/auth";

import { ApplicationData } from "../stepsProvider";

export async function createApplicationAction(
  application: ApplicationData,
  waveId: number,
) {
  const userId = await getUserId();
  const wave = await getWaveWithApplications(waveId);
  if (!wave) {
    throw new Error("createApplicationAction: Called on non existing wave");
  }

  const waveStage = getWaveStage(wave);
  const isCorrectStage = canPerformActionByStage(waveStage, "submissionAdd");

  if (!userId) {
    throw new UnauthenticatedError();
  }

  if (!isCorrectStage) {
    throw new Error("createApplicationAction: Called on wrong stage");
  }

  await insertApplication(
    {
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
