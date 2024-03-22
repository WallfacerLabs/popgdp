"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/constants/errors";
import { insertApplication } from "@/drizzle/queries/applications";

import { getUserId } from "@/lib/auth";

import { ApplicationData } from "../stepsProvider";

export async function createApplicationAction(
  application: ApplicationData,
  waveId: number,
) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertApplication(
    {
      name: application.name,
      summary: application.summary,
      entityName: application.entityName,
      duration: application.duration,
      budget: application.budget,

      teamSummary: application.teamSummary,

      idea: application.idea,
      reason: application.reason,
      state: application.state,
      goals: application.goals,
      requirements: application.requirements,

      tbd: application.tbd,

      imageId: application.imageId || undefined,
      waveId,
      userId,
    },
    application.members,
  );

  revalidatePath(`/waves/${waveId}`);
  redirect(`/waves/${waveId}`);
}
