"use server";

import { revalidatePath } from "next/cache";
import {
  deleteCommentValue,
  insertCommentValue,
} from "@/drizzle/queries/commentValues";
import { commentValues } from "@/drizzle/schema";
import { type Session } from "next-auth";

import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface CommentValueActionPayload extends ApplicationParamsSchema {
  commentId: string;
  session: Session | null;
  isChecked: boolean;
  value: (typeof commentValues.$inferInsert)["value"];
}

export async function commentValueAction({
  applicationId,
  session,
  commentId,
  waveId,
  isChecked,
  value,
}: CommentValueActionPayload) {
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (isChecked) {
    await deleteCommentValue({
      commentId,
      userId: session.user.id,
      value,
    });
  } else {
    await insertCommentValue({
      commentId,
      userId: session.user.id,
      value,
    });
  }

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
