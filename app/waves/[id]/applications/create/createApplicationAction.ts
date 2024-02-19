"use server";

import { auth } from "@/lib/auth";
import { createApplicationSchema } from "./createApplicationSchema";
import { db } from "@/drizzle/db";
import { applications } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createApplicationAction(
  data: createApplicationSchema,
  waveId: number
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  const [{ id }] = await db
    .insert(applications)
    .values({
      name: data.projectName,
      waveId,
      userId: session.user.id,
    })
    .returning({ id: applications.id });

  revalidatePath(`/applications/${id}`);
  redirect(`/applications/${id}`);
}
