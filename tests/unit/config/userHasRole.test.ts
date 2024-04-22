import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import { afterEach, describe, expect, it, vi } from "vitest";

import { userHasRole, UserPermission } from "@/config/userPermissions";

describe("userHasRole", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);

    vi.clearAllMocks();
  });

  const ethereumAddress = "0x88009922334455";
  const id = "0";

  async function createModerator() {
    await db.insert(Moderator).values({ ethereumAddress });
    await db.insert(User).values({ id, ethereumAddress });
  }

  async function createReviewer() {
    await db.insert(Reviewer).values({ ethereumAddress });
    await db.insert(User).values({ id, ethereumAddress });
  }

  async function createBlocked() {
    await db.insert(User).values({ id, isBlocked: true });
  }

  it("visitor", async () => {
    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(false);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("blocked", async () => {
    await createBlocked();
    mockUserSession({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("device verified", async () => {
    mockUserSession({ id, credentialType: "device" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("orb verified", async () => {
    mockUserSession({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("reviewer", async () => {
    await createReviewer();
    mockUserSession({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("moderator", async () => {
    await createModerator();
    mockUserSession({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(true);
  });
});
