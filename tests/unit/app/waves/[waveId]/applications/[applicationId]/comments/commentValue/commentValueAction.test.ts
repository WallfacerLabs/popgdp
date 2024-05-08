import { db } from "@/drizzle/db";
import {
  ApplicationValue,
  Comment,
  Moderator,
  Reviewer,
  User,
  Wave,
} from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createApplication,
  createBlocked,
  createCategory,
  createModerator,
  createReviewer,
  createUser,
  createWave,
  updateWaveStage,
} from "tests/helpers/queries";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { commentValueAction } from "@/app/waves/[waveId]/applications/[applicationId]/comments/commentValue/commentValueAction";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";
const commentId = "9b258f50-6be7-403e-9cbb-da8063c66e8d";

const defaultActionArgs = {
  applicationId,
  commentatorId: anotherUserId,
  commentId,
  isChecked: false,
  value: "spam",
  waveId,
} as const;

describe("app/waves/[waveId]/applications/[applicationId]/commentValue/commentValueAction", () => {
  beforeEach(async () => {
    await createUser(anotherUserId);
    await createWave(waveId);
    await updateWaveStage("assesment");
    await createCategory({ categoryId, waveId });
    await createApplication({
      applicationId,
      categoryId,
      userId: anotherUserId,
      waveId,
      isDraft: false,
    });

    await db.insert(Comment).values({
      applicationId,
      content: "comment",
      userId: anotherUserId,
      id: commentId,
    });
  });

  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    await db.delete(Wave);

    vi.clearAllMocks();
  });

  describe("permissions", () => {
    it("visitor", async () => {
      expect(() => commentValueAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to rate comments",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => commentValueAction(defaultActionArgs)).rejects.toThrowError(
        "You are blocked from performing this action",
      );
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() => commentValueAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot rate comments in this wave stage",
      );
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("assesment");

      await commentValueAction(defaultActionArgs);

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(1);
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() => commentValueAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot rate comments in this wave stage",
      );
    });
  });

  const values = ["spam", "positive"] as const;

  for (const value of values) {
    it(`can add ${value} value`, async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await commentValueAction({
        ...defaultActionArgs,
        isChecked: false,
        value,
      });

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toStrictEqual([
        {
          commentId,
          userId,
          value,
        },
      ]);
    });

    it(`can remove ${value} value`, async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await db.insert(ApplicationValue).values({
        applicationId,
        userId,
        value,
      });

      await commentValueAction({
        ...defaultActionArgs,
        isChecked: true,
        value,
      });

      const commentValues = await db.query.CommentValue.findMany();
      expect(commentValues).toHaveLength(0);
    });

    it(`throws error if rating own submission as ${value}`, async () => {
      mockUserSession({ userId: anotherUserId, credentialType: "orb" });

      expect(() =>
        commentValueAction({ ...defaultActionArgs, value }),
      ).rejects.toThrowError(`User cannot mark their own comment as ${value}`);
    });
  }
});
