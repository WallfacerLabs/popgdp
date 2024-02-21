"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { applications } from "@/drizzle/schema";

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

  const [{ id }] = await db
    .insert(applications)
    .values({
      name: data.projectName,
      description: data.description,
      waveId,
      userId: session.user.id,
    })
    .returning({ id: applications.id });

  revalidatePath(`/waves/${waveId}`);
  redirect(`/waves/${waveId}`);
}
