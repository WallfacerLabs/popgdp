"use server";

import { revalidatePath } from "next/cache";
import { insertComment } from "@/drizzle/queries/comments";

import { auth } from "@/lib/auth";

import { addCommentSchema } from "./addCommentSchema";

export async function addCommentAction(
  data: addCommentSchema,
  applicationId: number,
  waveId: number,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  await insertComment({
    applicationId,
    userId: session.user.id,
    content: data.comment,
  });

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}