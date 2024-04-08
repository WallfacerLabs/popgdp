import { getUserRoles } from "@/drizzle/queries/user";

import { getUserData } from "@/lib/auth";

export enum UserPermission {
  visitor = 0,
  deviceVerified = 1,
  orbVerified = 2,
  reviewer = 3,
  moderator = 4,
}

export async function getUserPermission(): Promise<UserPermission> {
  const user = await getUserData();
  if (!user?.id) {
    return UserPermission.visitor;
  }

  const { isReviewer, isModerator } = await getUserRoles(user.id);

  if (isModerator) {
    return UserPermission.moderator;
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
