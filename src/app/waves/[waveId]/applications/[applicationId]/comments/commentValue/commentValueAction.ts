"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import {
  deleteCommentValue,
  insertCommentValue,
} from "@/drizzle/queries/commentValues";

import { type ContentValue } from "@/types/ContentValue";
import { type UserId } from "@/types/User";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface CommentValueActionPayload extends ApplicationParamsSchema {
  commentId: string;
  userId: UserId | undefined;
  commentatorId: string;
  isChecked: boolean;
  value: ContentValue;
}

export async function commentValueAction({
  applicationId,
  userId,
  commentatorId,
  commentId,
  waveId,
  isChecked,
  value,
}: CommentValueActionPayload) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (userId === commentatorId) {
    throw new Error(`User cannot mark their own comment as ${value}.`);
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

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}
