"use server";

import { revalidatePath } from "next/cache";
import { UnauthenticatedError } from "@/constants/errors";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";
import { ApplicationValue } from "@/drizzle/schema";
import { type Session } from "next-auth";

import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface ApplicationValueActionPayload extends ApplicationParamsSchema {
  session: Session | null;
  isChecked: boolean;
  value: (typeof ApplicationValue.$inferInsert)["value"];
}

export async function applicationValueAction({
  session,
  applicationId,
  waveId,
  isChecked,
  value,
}: ApplicationValueActionPayload) {
  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  if (isChecked) {
    await deleteApplicationValue({
      applicationId,
      userId: session.user.id,
      value,
    });
  } else {
    await insertApplicationValue({
      applicationId,
      userId: session.user.id,
      value,
    });
  }

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
