"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import { insertComment } from "@/drizzle/queries/comments";

import { auth } from "@/lib/auth";

import { addCommentSchema } from "./addCommentSchema";

interface AddCommentActionPayload {
  data: addCommentSchema;
  applicationId: number;
  waveId: number;
}

export async function addCommentAction({
  data,
  applicationId,
  waveId,
}: AddCommentActionPayload) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  await insertComment({
    applicationId,
    userId: session.user.id,
    content: data.comment,
  });

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
