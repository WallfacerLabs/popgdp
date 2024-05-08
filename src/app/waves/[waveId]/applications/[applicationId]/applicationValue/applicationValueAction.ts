"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";

import { type ApplicationWithComments } from "@/types/Application";
import { type ContentValue } from "@/types/ContentValue";
import { canRateApplication } from "@/config/actionPermissions";

interface ApplicationValueActionPayload {
  isChecked: boolean;
  value: ContentValue;
  application: Pick<ApplicationWithComments, "id" | "waveId" | "userId">;
}

export async function applicationValueAction({
  application,
  isChecked,
  value,
}: ApplicationValueActionPayload) {
  const applicationId = application.id;
  const waveId = application.waveId;

  const { validationErrorMessage, userId } = await canRateApplication({
    creatorId: application.userId,
    waveId,
  });

  if (typeof validationErrorMessage !== "undefined") {
    throw new Error(validationErrorMessage);
  }

  const applicationValue = {
    applicationId,
    userId,
    value,
  } as const;

  if (isChecked) {
    await deleteApplicationValue(applicationValue);
  } else {
    await insertApplicationValue(applicationValue);
  }

  revalidatePath(
    urls.applications.preview({
      waveId,
      applicationId,
    }),
  );
}
