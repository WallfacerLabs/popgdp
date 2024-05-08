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
  application: Pick<ApplicationWithComments, "id" | "waveId" | "userId">;
  content: AddCommentSchema["content"];
}

export async function addCommentAction({
  content,
  application,
}: AddCommentActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { userId, validationErrorMessage } = await canAddComment(
    application.id,
  );

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
  application,
}: AddCommentActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

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
  application,
  replyTargetId,
}: AddReplyActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { userId, validationErrorMessage } = await canAddComment(
    application.id,
  );

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
