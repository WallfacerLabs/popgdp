import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createBlocked,
  createModerator,
  createReviewer,
  createUser,
} from "tests/helpers/queries";
import { afterEach, describe, expect, it, vi } from "vitest";

import { updateUserDetailsAction } from "@/app/profile/mainDetails/updateUserDetailsAction";

const userId = "0";

const userDetails = {
  nickname: "Default user",
};

describe("app/profile/mainDetails/updateUserDetailsAction", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    await db.delete(Wave);

    vi.clearAllMocks();
  });

  describe("permissions", () => {
    it("visitor", async () => {
      expect(() => updateUserDetailsAction(userDetails)).rejects.toThrowError(
        "Unauthenticated",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateUserDetailsAction(userDetails);

      const users = await db.query.User.findMany();
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(userDetails.nickname);
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      await updateUserDetailsAction(userDetails);

      const users = await db.query.User.findMany();
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(userDetails.nickname);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateUserDetailsAction(userDetails);

      const users = await db.query.User.findMany();
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(userDetails.nickname);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateUserDetailsAction(userDetails);

      const users = await db.query.User.findMany();
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(userDetails.nickname);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateUserDetailsAction(userDetails);

      const users = await db.query.User.findMany();
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(userDetails.nickname);
    });
  });

  it("can update user details", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });

    await updateUserDetailsAction({
      nickname: "random user",
      avatar: {
        id: "8e60662c-e935-48dd-9493-76139d5bf950",
        height: 120,
        width: 120,
        placeholder: "placeholder",
      },
    });

    const users = await db.query.User.findMany();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("random user");
    expect(users[0].imageId).toBe("8e60662c-e935-48dd-9493-76139d5bf950");
  });

  it("can't set name if duplicate", async () => {
    const name = "username";
    const firstUserId = "1";
    const secondUserId = "2";

    mockUserSession({ userId: secondUserId, credentialType: "device" });
    await createUser(firstUserId);
    await createUser(secondUserId);
    await db.update(User).set({ name }).where(eq(User.id, firstUserId));

    expect(await updateUserDetailsAction({ nickname: name })).toStrictEqual({
      error: "Nickname is already taken",
    });
  });
});
