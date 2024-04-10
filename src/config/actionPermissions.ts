import { getUserId } from "@/lib/auth";

import { userHasRole, UserPermission } from "./userPermissions";

interface CanRateApplicationArgs {
  creatorId: string;
}

export async function canRateApplication({
  creatorId,
}: CanRateApplicationArgs) {
  const userId = await getUserId();
  if (!userId) {
    return {
      validationErrorMessage: "You need to be signed in to rate submissions",
    };
  }

  const isOrbVerifier = await userHasRole(UserPermission.orbVerified);
  if (!isOrbVerifier) {
    return {
      validationErrorMessage: "You need to be orb verified to rate submissions",
    };
  }

  if (creatorId === userId) {
    return {
      validationErrorMessage: "You cannot rate your own submission",
    };
  }

  return { userId };
}
