"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";
import { ApplicationValue } from "@/drizzle/schema";

import { type UserId } from "@/lib/auth";
import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface ApplicationValueActionPayload extends ApplicationParamsSchema {
  userId: UserId | undefined;
  isChecked: boolean;
  value: (typeof ApplicationValue.$inferInsert)["value"];
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

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
