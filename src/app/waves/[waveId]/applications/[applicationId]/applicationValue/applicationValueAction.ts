"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import { urls } from "@/constants/urls";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";

import { type ContentValue } from "@/types/ContentValue";
import { type UserId } from "@/types/User";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface ApplicationValueActionPayload extends ApplicationParamsSchema {
  userId: UserId | undefined;
  creatorId: string;
  isChecked: boolean;
  value: ContentValue;
}

export async function applicationValueAction({
  userId,
  creatorId,
  applicationId,
  waveId,
  isChecked,
  value,
}: ApplicationValueActionPayload) {
  if (!userId) {
    throw new UnauthenticatedError();
  }

  if (userId === creatorId) {
    throw new Error(`User cannot mark their own post as ${value}.`);
  }

  if (isChecked) {
    await deleteApplicationValue({
      applicationId,
      userId,
      value,
    });
  } else {
    await insertApplicationValue({
      applicationId,
      userId,
      value,
    });
  }

  revalidatePath(urls.applications.preview({ waveId, applicationId }));
}
