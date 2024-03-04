"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertApplication } from "@/drizzle/queries/applications";

import { auth } from "@/lib/auth";

export async function createApplicationAction(
  data: any,
  waveId: number,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  await insertApplication({
    name: data.projectName,
    description: data.summary,
    waveId,
    userId: session.user.id,
  });

  revalidatePath(`/waves/${waveId}`);
  redirect(`/waves/${waveId}`);
}
