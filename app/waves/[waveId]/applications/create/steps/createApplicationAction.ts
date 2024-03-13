"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/constants/errors";
import { insertApplication } from "@/drizzle/queries/applications";

import { auth } from "@/lib/auth";

import { ApplicationData } from "../stepsProvider";

export async function createApplicationAction(
  data: ApplicationData,
  waveId: number,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  await insertApplication({
    name: data.projectName,
    description: data.projectSummary,
    waveId,
    userId: session.user.id,
  });

  revalidatePath(`/waves/${waveId}`);
  redirect(`/waves/${waveId}`);
}
