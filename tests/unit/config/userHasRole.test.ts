import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";
import { afterEach, describe, expect, it } from "vitest";

import { userHasRole, UserPermission } from "@/config/userPermissions";

import { clearSession, setUser } from "../../helpers/getSession";

describe("userHasRole", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    clearSession();
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
    setUser({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("device verified", async () => {
    setUser({ id, credentialType: "device" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("orb verified", async () => {
    setUser({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("reviewer", async () => {
    await createReviewer();
    setUser({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
  });

  it("moderator", async () => {
    await createModerator();
    setUser({ id, credentialType: "orb" });

    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(true);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(true);
  });
});
