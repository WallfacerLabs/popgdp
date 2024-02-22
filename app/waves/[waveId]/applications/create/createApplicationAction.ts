"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertApplication } from "@/drizzle/queries/applications";

import { auth } from "@/lib/auth";

import { createApplicationSchema } from "./createApplicationSchema";

export async function createApplicationAction(
  data: createApplicationSchema,
  waveId: number,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  await insertApplication({
    name: data.projectName,
    description: data.description,
    waveId,
    userId: session.user.id,
  });

  revalidatePath(`/waves/${waveId}`);
  redirect(`/waves/${waveId}`);
}
