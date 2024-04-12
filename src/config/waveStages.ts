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
}: WaveStageArgs): WaveStage {
  const currentDate = new Date();

  if (currentDate > closeDate) {
    return "close";
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

export type UserAction =
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
    reviewAdd:      true,
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
