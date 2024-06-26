import { cookies } from "next/headers";
import { ValidationError } from "@/constants/errors";
import { getApplicationWithComments } from "@/drizzle/queries/applications";
import { getUserRoles } from "@/drizzle/queries/user";
import { getWaveDates } from "@/drizzle/queries/waves";

import {
  type ApplicationId,
  type ApplicationWithComments,
} from "@/types/Application";
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
  const { isBlocked } = await getUserRoles(userId);
  if (isBlocked) {
    throw new ValidationError("You are blocked from performing this action");
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
  if (cookies()?.get("skipWaveStageCheck")?.value === "true") return;

  const wave = await getWaveDates(waveId);
  const { waveStage } = getWaveStage(wave);
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

export async function canEditSubmission(applicationId: ApplicationId) {
  try {
    const userId = await checkUserId("You need to be signed in to edit");
    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    if (userId !== application.userId) {
      throw new ValidationError("You can only edit your own submission");
    }
    await checkWaveStage({
      waveId: application.waveId,
      action: "submissionEdit",
      errorMsg: "You cannot edit submission in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canPublishDraft(applicationId: ApplicationId) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to publish draft",
    );
    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    if (userId !== application.userId) {
      throw new ValidationError("Invalid user id");
    }
    await checkWaveStage({
      waveId: application.waveId,
      action: "submissionAdd",
      errorMsg: "You cannot publish draft in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canRateApplication(applicationId: ApplicationId) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to rate submissions",
    );
    await checkUserRole({
      role: UserPermission.orbVerified,
      errorMsg: "You need to be orb verified to rate submissions",
    });

    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    await checkWaveStage({
      waveId: application.waveId,
      action: "submissionVote",
      errorMsg: "You cannot rate submissions in this wave stage",
    });
    if (application.userId === userId) {
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

export async function canAddComment(applicationId: ApplicationId) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to add comments",
    );

    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    const isOrbVerified = await userHasRole(UserPermission.orbVerified);
    if (!isOrbVerified && application.userId !== userId) {
      throw new ValidationError(
        "You need to be orb verified to add comments under other users submissions",
      );
    }

    await checkWaveStage({
      waveId: application.waveId,
      action: "commentAdd",
      errorMsg: "You cannot add comments in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canEditComment(applicationId: ApplicationId) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to edit comments",
    );

    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    const isOrbVerified = await userHasRole(UserPermission.orbVerified);
    if (!isOrbVerified && application.userId !== userId) {
      throw new ValidationError(
        "You need to be orb verified to edit comments under other users submissions",
      );
    }

    await checkWaveStage({
      waveId: application.waveId,
      action: "commentAdd",
      errorMsg: "You cannot edit comments in this wave stage",
    });
    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}

export async function canAddReview(
  applicationId: ApplicationWithComments["id"],
) {
  try {
    const userId = await checkUserId("You need to be signed in to review");
    await checkUserRole({
      role: UserPermission.reviewer,
      errorMsg: "You need to be reviewer to review",
    });

    const application = await getApplicationWithComments(applicationId, userId);
    if (!application) {
      throw new Error("Application not found");
    }

    if (application.userId === userId) {
      throw new ValidationError("You cannot review your own submission");
    }

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

export async function canRateComment({ waveId }: { waveId: number }) {
  try {
    const userId = await checkUserId(
      "You need to be signed in to rate comments",
    );

    await checkWaveStage({
      action: "commentValue",
      waveId,
      errorMsg: "You cannot rate comments in this wave stage",
    });

    return { userId };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validationErrorMessage: error.message };
    }
    throw error;
  }
}
