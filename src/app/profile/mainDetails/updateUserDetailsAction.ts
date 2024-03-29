"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import { updateUser } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";

import { type ProfileDetailsSchema } from "./updateUserDetailsForm";

export async function updateUserDetailsAction(
  userDetails: ProfileDetailsSchema,
) {
  const userId = await getUserId();
  if (!userId) {
    throw new UnauthenticatedError();
  }

  await updateUser({
    id: userId,
    name: userDetails.nickname,
    imageId: userDetails.avatar?.id,
  });

  revalidatePath(urls.root);
}
