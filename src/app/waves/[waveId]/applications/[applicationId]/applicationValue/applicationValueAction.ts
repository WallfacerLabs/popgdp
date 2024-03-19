"use server";

import { revalidatePath } from "next/cache";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";
import { applicationValues } from "@/drizzle/schema";
import { type Session } from "next-auth";

import { ApplicationParamsSchema } from "@/lib/paramsValidation";

interface ApplicationValueActionPayload extends ApplicationParamsSchema {
  session: Session | null;
  isChecked: boolean;
  value: (typeof applicationValues.$inferInsert)["value"];
}

export async function applicationValueAction({
  session,
  applicationId,
  waveId,
  isChecked,
  value,
}: ApplicationValueActionPayload) {
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
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