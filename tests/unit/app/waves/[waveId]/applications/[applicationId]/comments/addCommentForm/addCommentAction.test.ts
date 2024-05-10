import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
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

import { addCommentAction } from "@/app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/addCommentAction";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const anotherApplicationId = "92effe54-7821-4932-be1f-6fa264fa7ec6"
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";

const defaultActionArgs = {
  application: {
    id: applicationId,
    userId: anotherUserId,
    waveId,
    comments: [],
  },
  content: "comment",
};

describe("app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/addCommentAction", () => {
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
      expect(() => addCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to add comments",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => addCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You are blocked from performing this action",
      );
    });

    it("device verified - other user application", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => addCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be orb verified to add comments under other users submissions",
      );
    });

    it("device verified - own application", async () => {
      const ownArgs = {
        ...defaultActionArgs,
        application: {
          ...defaultActionArgs.application,
          userId,
          id: anotherApplicationId,
        },
      };

      await createUser(userId);
      await createApplication({
        applicationId: anotherApplicationId,
        categoryId,
        userId,
        waveId,
        isDraft: false,
      });
      mockUserSession({ userId, credentialType: "device" });

      await addCommentAction(ownArgs);

      const comments = await db.query.Comment.findMany();

      expect(comments).toHaveLength(1);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() => addCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add comments in this wave stage",
      );
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("assesment");

      await addCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() => addCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add comments in this wave stage",
      );
    });
  });

  it("can add comment", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await addCommentAction(defaultActionArgs);

    const comments = await db.query.Comment.findMany();
    expect(comments).toHaveLength(1);
    expect(comments[0]).toMatchObject({
      applicationId,
      content: defaultActionArgs.content,
      userId,
      replyTargetId: null,
    });
  });

  it("can add multiple comments", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await addCommentAction(defaultActionArgs);
    await addCommentAction(defaultActionArgs);
    await addCommentAction(defaultActionArgs);

    const comments = await db.query.Comment.findMany();
    expect(comments).toHaveLength(3);
  });
});
