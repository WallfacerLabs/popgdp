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
  isChecked: boolean;
  value: ContentValue;
}

export async function applicationValueAction({
  userId,
  applicationId,
  waveId,
  isChecked,
  value,
}: ApplicationValueActionPayload) {
  if (!userId) {
    throw new UnauthenticatedError();
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
