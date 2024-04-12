import { getUserRoles } from "@/drizzle/queries/user";

import { getUserData } from "@/lib/auth";

export enum UserPermission {
  visitor = 0,
  blocked = 1,
  deviceVerified = 2,
  orbVerified = 3,
  reviewer = 4,
  moderator = 5,
}

export async function getUserPermission(): Promise<UserPermission> {
  const user = await getUserData();
  if (!user?.id) {
    return UserPermission.visitor;
  }

  const { isReviewer, isModerator, isBlocked } = await getUserRoles(user.id);

  if (isModerator) {
    return UserPermission.moderator;
  }

  if (isBlocked) {
    return UserPermission.blocked;
  }

  if (isReviewer) {
    return UserPermission.reviewer;
  }

  if (user?.verificationLevel === "orb") {
    return UserPermission.orbVerified;
  }

  return UserPermission.deviceVerified;
}

export async function userHasRole(permission: UserPermission) {
  const userPermissions = await getUserPermission();
  return userPermissions >= permission;
}
