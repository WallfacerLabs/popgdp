import { getSession } from "@auth0/nextjs-auth0";
import { z } from "zod";

export const userSchema = z.object({
  sid: z.string().brand("sessionUserId"),
});

export type UserId = z.infer<typeof userSchema>["sid"];

export async function getUserId(): Promise<UserId | undefined> {
  const session = await getSession();

  if (!session) {
    return undefined;
  }

  const user = userSchema.safeParse(session.user);
  if (!user.success) {
    return undefined;
  }

  return user.data.sid;
}

type WaveStage = "notOpen" | "open" | "denoising" | "assesment" | "closed";

interface WaveStageArgs {
  openStartDate: Date;
  denoisingStartDate: Date;
  assesmentStartDate: Date;
  closeDate: Date;
}

export function getWaveStage({
  openStartDate,
  denoisingStartDate,
  assesmentStartDate,
  closeDate,
}: WaveStageArgs): WaveStage {
  const currentDate = new Date();

  if (currentDate > closeDate) {
    return "closed";
  }

  if (currentDate > assesmentStartDate) {
    return "assesment";
  }

  if (currentDate > denoisingStartDate) {
    return "denoising";
  }

  if (currentDate > openStartDate) {
    return "open";
  }

  return "notOpen";
}

type UserAction =
  | "submissionAdd"
  | "submissionEdit"
  | "submissionSpam"
  | "submissionVote"
  | "commentAdd"
  | "commentValue"
  | "reviewAdd";

// prettier-ignore
const canPerformByStage = {
  open: {
    submissionAdd:  true,
    submissionEdit: true,
    submissionSpam: true,
    submissionVote: false,
    commentAdd:     true,
    commentValue:   true,
    reviewAdd:      false,
  },
  denoising: {
    submissionAdd:  false,
    submissionEdit: true,
    submissionSpam: true,
    submissionVote: false,
    commentAdd:     true,
    commentValue:   true,
    reviewAdd:      false,
  },
  assesment: {
    submissionAdd:  false,
    submissionEdit: false,
    submissionSpam: true,
    submissionVote: true,
    commentAdd:     true,
    commentValue:   true,
    reviewAdd:      false,
  },
} satisfies Record<
  Exclude<WaveStage, "notOpen" | "closed">,
  Record<UserAction, boolean>
>;

export function canPerformActionByStage(
  stage: WaveStage,
  action: UserAction,
): boolean {
  if (stage === "notOpen" || stage === "closed") {
    return false;
  }

  return canPerformByStage[stage][action];
}
