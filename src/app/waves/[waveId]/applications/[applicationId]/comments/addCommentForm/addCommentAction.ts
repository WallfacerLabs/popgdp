"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import {
  insertComment,
  insertCommentAsReview,
} from "@/drizzle/queries/comments";

import { type ApplicationWithComments } from "@/types/Application";
import { canAddComment, canAddReview } from "@/config/actionPermissions";

import { type AddCommentSchema } from "./addCommentSchema";

export interface AddCommentActionPayload {
  application: ApplicationWithComments;
  data: AddCommentSchema;
}

export async function addCommentAction({
  data,
  application,
}: AddCommentActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { userId, validationErrorMessage } = await canAddComment(application);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
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
  application,
}: AddCommentActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { userId, validationErrorMessage } = await canAddReview(application);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
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
  application,
  replyTargetId,
}: AddReplyACtionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { userId, validationErrorMessage } = await canAddComment(application);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await insertComment({
    applicationId,
    userId,
    content: data.comment,
    replyTargetId,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}
