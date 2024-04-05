"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { updateReviewers } from "@/drizzle/queries/reviewers";

import { type Reviewer } from "@/types/Reviewer";
import { getUserId } from "@/lib/auth";

export async function updateReviewersAction(reviewers: Array<Reviewer>) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await updateReviewers(reviewers);

  revalidatePath(urls.moderator.reviewers);
}
