"use server";

import { revalidatePath } from "next/cache";
import { urls } from "@/constants/urls";
import { publishDraft } from "@/drizzle/queries/applications";

import { ApplicationId } from "@/types/Application";

export async function publishDraftAction({
  applicationId,
  waveId,
}: {
  applicationId: ApplicationId;
  waveId: number;
}) {
  // await canPublishDraft()

  await publishDraft(applicationId);
  console.log("published");
  revalidatePath(urls.applications.preview({ applicationId, waveId }));
}
