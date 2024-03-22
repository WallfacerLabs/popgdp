"use server";

import { revalidatePath } from "next/cache";
import {
  deleteCommentValue,
  insertCommentValue,
} from "@/drizzle/queries/commentValues";
import { CommentValue } from "@/drizzle/schema";

import { type UserId } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface CommentValueActionPayload extends ApplicationParamsSchema {
  commentId: string;
  userId: UserId | undefined;
  isChecked: boolean;
  value: (typeof CommentValue.$inferInsert)["value"];
}

export async function commentValueAction({
  applicationId,
  userId,
  commentId,
  waveId,
  isChecked,
  value,
}: CommentValueActionPayload) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (isChecked) {
    await deleteCommentValue({
      commentId,
      userId,
      value,
    });
  } else {
    await insertCommentValue({
      commentId,
      userId,
      value,
    });
  }

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
