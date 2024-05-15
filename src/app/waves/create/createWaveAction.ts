"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { insertWave } from "@/drizzle/queries/waves";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { getUTCStartOfDate } from "@/lib/dates";

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
      openStartDate: getUTCStartOfDate(data.openStartDate),
      denoisingStartDate: getUTCStartOfDate(data.denoisingStartDate),
      assesmentStartDate: getUTCStartOfDate(data.assesmentStartDate),
      closeDate: getUTCStartOfDate(data.closeDate),
    },
    data.categories,
  );

  revalidatePath(urls.root);
  redirect(urls.waves.preview({ waveId }));
}
