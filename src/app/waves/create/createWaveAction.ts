"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/constants/errors";
import { insertWave } from "@/drizzle/queries/waves";

import { getUserId } from "@/lib/auth";

import { WaveData } from "./stepsProvider";

export async function createWaveAction(data: WaveData) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  const [{ id }] = await insertWave({
    name: data.name,
    summary: data.summary,
    openStartDate: data.openStartDate,
    denoisingStartDate: data.denoisingStartDate,
    assesmentStartDate: data.assesmentStartDate,
    closeDate: data.closeDate,
  });

  revalidatePath("/");
  redirect(`/waves/${id}`);
}
