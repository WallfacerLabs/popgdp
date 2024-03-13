"use server";

import { revalidatePath } from "next/cache";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";

import { auth } from "@/lib/auth";

interface UpvoteActionPayload {
  waveId: number;
  applicationId: number;
  isUpvoted: boolean;
}

export async function upvoteAction({
  applicationId,
  waveId,
  isUpvoted,
}: UpvoteActionPayload) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (isUpvoted) {
    await deleteApplicationValue({
      applicationId,
      userId: session.user.id,
      value: "positive",
    });
  } else {
    await insertApplicationValue({
      applicationId,
      userId: session.user.id,
      value: "positive",
    });
  }

  revalidatePath(`/waves/${waveId}/applications/${applicationId}`);
}
