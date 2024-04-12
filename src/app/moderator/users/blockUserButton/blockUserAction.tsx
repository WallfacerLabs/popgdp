"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import {
  updateUserBlockedFlags,
  type UpdateUserBlockedFlagsData,
} from "@/drizzle/queries/user";

import { userHasRole, UserPermission } from "@/config/userPermissions";

export async function blockUserAction(updateArgs: UpdateUserBlockedFlagsData) {
  const isModerator = userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw new UnauthorizedError();
  }

  await updateUserBlockedFlags(updateArgs);

  revalidatePath(urls.root);
}
