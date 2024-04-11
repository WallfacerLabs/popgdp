"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { updateReviewers } from "@/drizzle/queries/reviewers";

import { type Reviewer } from "@/types/Reviewer";
import { userHasRole, UserPermission } from "@/config/userPermissions";

export async function updateReviewersAction(reviewers: Array<Reviewer>) {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw new UnauthorizedError();
  }

  await updateReviewers(reviewers);

  revalidatePath(urls.moderator.reviewers);
}
