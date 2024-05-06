import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createBlocked,
  createModerator,
  createReviewer,
} from "tests/helpers/queries";
import { afterEach, describe, expect, it, vi } from "vitest";

import { userHasRole, UserPermission } from "@/config/userPermissions";

describe("userHasRole", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);

    vi.clearAllMocks();
  });

  const userId = "0";

  it("visitor", async () => {
    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(false);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("blocked", async () => {
    await createBlocked(userId);
    mockUserSession({ userId, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("device verified", async () => {
    mockUserSession({ userId, credentialType: "device" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("orb verified", async () => {
    mockUserSession({ userId, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("reviewer", async () => {
    await createReviewer(userId);
    mockUserSession({ userId, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("moderator", async () => {
    await createModerator(userId);
    mockUserSession({ userId, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(true);
  });
});
