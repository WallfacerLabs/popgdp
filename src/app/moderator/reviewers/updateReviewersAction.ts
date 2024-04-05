"use server";

import { UnauthenticatedError } from "@/constants/errors";
import { insertReviewers } from "@/drizzle/queries/reviewers";

import { type Reviewer } from "@/types/Reviewer";
import { getUserId } from "@/lib/auth";

export async function updateReviewersAction(reviewers: Array<Reviewer>) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await insertReviewers(reviewers);
}
