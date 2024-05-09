"use server";

import { urls } from "@/constants/urls";
import {
  editComment,
  insertComment,
  insertCommentAsReview,
} from "@/drizzle/queries/comments";
import { revalidatePath } from "next/cache";

import { canAddComment, canAddReview, canEditComment } from "@/config/actionPermissions";
import { type ApplicationId } from "@/types/Application";

import { type AddCommentSchema } from "./addCommentSchema";

export interface AddCommentActionPayload {
  applicationId: ApplicationId;
  waveId: number;
  content: AddCommentSchema["content"];
}

export async function addCommentAction({
  content,
  applicationId,
  waveId,
}: AddCommentActionPayload) {
  const { userId, validationErrorMessage } = await canAddComment(applicationId);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await insertComment({
    applicationId,
    userId,
    content,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}

export async function addReviewAction({
  content,
  applicationId,
  waveId,
}: AddCommentActionPayload) {
  const { userId, validationErrorMessage } = await canAddReview(applicationId);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await insertCommentAsReview({
    applicationId,
    userId,
    content,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}

export interface AddReplyActionPayload extends AddCommentActionPayload {
  replyTargetId: string;
}

export async function addReplyAction({
  content,
  applicationId,
  waveId,
  replyTargetId,
}: AddReplyActionPayload) {
  const { userId, validationErrorMessage } = await canAddComment(applicationId);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await insertComment({
    applicationId,
    userId,
    content,
    replyTargetId,
  });

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}

export interface EditCommentActionPayload extends AddCommentActionPayload {
  editTargetId: string;
}

export async function editCommentAction({
  content,
  applicationId,
}: EditCommentActionPayload) {
  const { userId, validationErrorMessage } = await canEditComment(
    applicationId,
  );

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await editComment({
    applicationId,
    userId,
    content,
  });
}
