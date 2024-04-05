import { getUserRoles } from "@/drizzle/queries/user";

import { getUserId } from "@/lib/auth";

export enum UserPermission {
  visitor = 0,
  deviceVerified = 1,
  orbVerified = 2,
  reviewer = 3,
  moderator = 4,
}

export async function getUserPermission(): Promise<UserPermission> {
  const userId = await getUserId();
  if (!userId) {
    return UserPermission.visitor;
  }

  const { isReviewer } = await getUserRoles(userId);

  if (isReviewer) {
    return UserPermission.reviewer;
  }

  return UserPermission.orbVerified;
}

export async function userHasRole(permission: UserPermission) {
  const userPermissions = await getUserPermission();
  return userPermissions >= permission;
}
