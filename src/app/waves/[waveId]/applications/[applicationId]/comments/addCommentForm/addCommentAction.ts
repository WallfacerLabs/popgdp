"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import {
  insertComment,
  insertCommentAsReview,
} from "@/drizzle/queries/comments";

import { getUserId } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

import { addCommentSchema } from "./addCommentSchema";

export interface AddCommentActionPayload extends ApplicationParamsSchema {
  data: addCommentSchema;
}

export async function addCommentAction({
  data,
  applicationId,
  waveId,
}: AddCommentActionPayload) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertComment({
    applicationId,
    userId,
    content: data.comment,
  });

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}

export async function addReviewAction({
  data,
  applicationId,
  waveId,
}: AddCommentActionPayload) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertCommentAsReview({
    applicationId,
    userId,
    content: data.comment,
  });

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}

export interface AddReplyACtionPayload extends AddCommentActionPayload {
  replyTargetId: string;
}

export async function addReplyAction({
  data,
  applicationId,
  waveId,
  replyTargetId,
}: AddReplyACtionPayload) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertComment({
    applicationId,
    userId,
    content: data.comment,
    replyTargetId: replyTargetId,
  });

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
