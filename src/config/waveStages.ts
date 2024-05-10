export type WaveStage =
  | "notOpen"
  | "open"
  | "denoising"
  | "assesment"
  | "close";

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
}: WaveStageArgs): { waveStage: WaveStage; nextStageDate: Date | undefined } {
  const currentDate = new Date();

  if (currentDate > closeDate) {
    return { waveStage: "close", nextStageDate: undefined };
  }

  if (currentDate > assesmentStartDate) {
    return { waveStage: "assesment", nextStageDate: closeDate };
  }

  if (currentDate > denoisingStartDate) {
    return { waveStage: "denoising", nextStageDate: assesmentStartDate };
  }

  if (currentDate > openStartDate) {
    return { waveStage: "open", nextStageDate: denoisingStartDate };
  }

  return { waveStage: "notOpen", nextStageDate: openStartDate };
}

export type UserAction =
  | "submissionAdd"
  | "submissionEdit"
  | "submissionInvalid"
  | "submissionVote"
  | "commentAdd"
  | "commentValue"
  | "reviewAdd";

// prettier-ignore
const canPerformByStage = {
  open: {
    submissionAdd: true,
    submissionEdit: true,
    submissionInvalid: true,
    submissionVote: false,
    commentAdd: true,
    commentValue: true,
    reviewAdd: false,
  },
  denoising: {
    submissionAdd: false,
    submissionEdit: true,
    submissionInvalid: true,
    submissionVote: false,
    commentAdd: true,
    commentValue: true,
    reviewAdd: false,
  },
  assesment: {
    submissionAdd: false,
    submissionEdit: false,
    submissionInvalid: true,
    submissionVote: true,
    commentAdd: true,
    commentValue: true,
    reviewAdd: true,
  },
} satisfies Record<
  Exclude<WaveStage, "notOpen" | "close">,
  Record<UserAction, boolean>
>;

export function canPerformActionByStage(
  stage: WaveStage,
  action: UserAction,
): boolean {
  if (stage === "notOpen" || stage === "close") {
    return false;
  }

  return canPerformByStage[stage][action];
}
