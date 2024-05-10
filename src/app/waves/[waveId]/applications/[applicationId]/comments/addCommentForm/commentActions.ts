"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import {
  insertComment,
  insertCommentAsReview,
  updateComment,
} from "@/drizzle/queries/comments";

import { type ApplicationId } from "@/types/Application";
import { Comment } from "@/types/Comment";
import {
  canAddComment,
  canAddReview,
  canEditComment,
} from "@/config/actionPermissions";

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

export interface UpdateCommentActionPayload {
  applicationId: ApplicationId;
  commentId: Comment["id"];
  newContent: Comment["content"];
}

export async function updateCommentAction({
  applicationId,
  commentId,
  newContent,
}: UpdateCommentActionPayload) {
  const { validationErrorMessage } = await canEditComment(applicationId);

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  await updateComment({
    newContent,
    commentId,
  });
}
