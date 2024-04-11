import { ValidationError } from "@/constants/errors";
import { getWaveDates } from "@/drizzle/queries/waves";

import { ApplicationWithComments } from "@/types/Application";
import { getUserId } from "@/lib/auth";

import { userHasRole, UserPermission } from "./userPermissions";
import {
  canPerformActionByStage,
  getWaveStage,
  type UserAction,
} from "./waveStages";

async function checkUserId(errorMsg: string) {
  const userId = await getUserId();
  if (!userId) {
    throw new ValidationError(errorMsg);
  }
  return userId;
}

async function checkUserRole({
  role,
  errorMsg,
}: {
  role: UserPermission;
  errorMsg: string;
}) {
  const isOrbVerified = await userHasRole(role);
  if (!isOrbVerified) {
    throw new ValidationError(errorMsg);
  }
}

async function checkWaveStage({
  action,
  errorMsg,
  waveId,
}: {
  waveId: number;
  action: UserAction;
  errorMsg: string;
}) {
  const wave = await getWaveDates(waveId);
  const waveStage = getWaveStage(wave);
  const isCorrectStage = canPerformActionByStage(waveStage, action);
  if (!isCorrectStage) {
    throw new ValidationError(errorMsg);
  }
}

export async function canAddSubmission({ waveId }: { waveId: number }) {
  try {
    const userId = await checkUserId("You need to be signed in to apply");
    await checkWaveStage({
      waveId,
      action: "submissionAdd",
      errorMsg: "You cannot apply in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

interface CanRateApplicationArgs {
  creatorId: string;
  waveId: number;
}

export async function canRateApplication({
  creatorId,
  waveId,
}: CanRateApplicationArgs) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to rate submissions",
    );
    await checkUserRole({
      role: UserPermission.orbVerified,
      errorMsg: "You need to be orb verified to rate submissions",
    });
    await checkWaveStage({
      waveId,
      action: "submissionVote",
      errorMsg: "You cannot rate submissions in this wave stage",
    });
    if (creatorId === userId) {
      throw new ValidationError("You cannot rate your own submission");
    }
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canAddComment(application: ApplicationWithComments) {
  try {
    const userId = await checkUserId("You need to be signed in to apply");
    await checkWaveStage({
      waveId: application.waveId,
      action: "submissionAdd",
      errorMsg: "You cannot apply in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canAddReview(application: ApplicationWithComments) {
  try {
    const userId = await checkUserId("You need to be signed in to review");
    await checkUserRole({
      role: UserPermission.reviewer,
      errorMsg: "You need to be reviewer to review",
    });

    const alreadyReviewed = application.comments
      .filter((comment) => comment.review?.isReview)
      .some((review) => review.userId === userId);
    if (alreadyReviewed) {
      throw new ValidationError("You have already reviewed this submission");
    }

    await checkWaveStage({
      waveId: application.waveId,
      action: "reviewAdd",
      errorMsg: "You cannot add review in this wave stage",
    });

    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}
