"use server";

import { revalidatePath } from "next/cache";
import {
  deleteApplicationValue,
  insertApplicationValue,
} from "@/drizzle/queries/applicationValues";
import { type Session } from "next-auth";

interface UpvoteActionPayload {
  session: Session | null;
  waveId: number;
  applicationId: number;
  isUpvoted: boolean;
}

export async function upvoteAction({
  session,
  applicationId,
  waveId,
  isUpvoted,
}: UpvoteActionPayload) {
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
