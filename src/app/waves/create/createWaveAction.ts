"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { insertWave } from "@/drizzle/queries/waves";

import { userHasRole, UserPermission } from "@/config/userPermissions";

import { WaveData } from "./stepsProvider";

export async function createWaveAction(data: WaveData) {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw new UnauthorizedError();
  }

  const waveId = await insertWave(
    {
      name: data.name,
      summary: data.summary,
      openStartDate: data.openStartDate,
      denoisingStartDate: data.denoisingStartDate,
      assesmentStartDate: data.assesmentStartDate,
      closeDate: data.closeDate,
    },
    data.categories,
  );

  revalidatePath(urls.root);
  redirect(urls.waves.preview({ waveId }));
}
