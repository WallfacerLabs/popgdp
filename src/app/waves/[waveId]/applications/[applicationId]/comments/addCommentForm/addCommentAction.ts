"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError, UnauthorizedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import {
  insertComment,
  insertCommentAsReview,
} from "@/drizzle/queries/comments";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { getUserId } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

import { type AddCommentSchema } from "./addCommentSchema";

export interface AddCommentActionPayload extends ApplicationParamsSchema {
  data: AddCommentSchema;
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

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
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

  const isReviewer = await userHasRole(UserPermission.reviewer);
  if (!isReviewer) {
    throw new UnauthorizedError();
  }

  await insertCommentAsReview({
    applicationId,
    userId,
    content: data.comment,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
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
    replyTargetId,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}
