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

import {
  addCommentAction,
  updateCommentAction,
} from "@/app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/commentActions";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";
const commentId = "5c8c268c-3a34-43ec-b8b7-58a0cbe9adde";

const addCommentActionArgs = {
  applicationId,
  waveId,
  content: "Original comment",
};

const updateCommentActionArgs = {
  applicationId,
  commentId,
  content: "Updated comment",
};

describe("app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/updateCommentAction", () => {
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
      expect(() =>
        updateCommentAction(updateCommentActionArgs),
      ).rejects.toThrowError("You need to be signed in to edit comments");
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() =>
        updateCommentAction(updateCommentActionArgs),
      ).rejects.toThrowError("You are blocked from performing this action");
    });

    it("device verified - other user application", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() =>
        updateCommentAction(updateCommentActionArgs),
      ).rejects.toThrowError(
        "You need to be orb verified to edit comments under other users submissions",
      );
    });

    it("device verified - own application", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      const userApplicationId = "d14f44cd-7a64-4b1c-9731-47cee811e149";
      await createApplication({
        applicationId: userApplicationId,
        categoryId,
        userId,
        waveId,
        isDraft: false,
      });

      await addCommentAction({
        ...addCommentActionArgs,
        applicationId: userApplicationId,
      });

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);

      const comment = comments[0];

      await updateCommentAction({
        ...updateCommentActionArgs,
        applicationId: userApplicationId,
        commentId: comment.id,
      });

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(updateCommentActionArgs.content);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(addCommentActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);

      const comment = comments[0];
      await updateCommentAction({
        ...updateCommentActionArgs,
        commentId: comment.id,
      });

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(updateCommentActionArgs.content);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(addCommentActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);

      const comment = comments[0];
      await updateCommentAction({
        ...updateCommentActionArgs,
        commentId: comment.id,
      });

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(updateCommentActionArgs.content);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addCommentAction(addCommentActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);

      const comment = comments[0];
      await updateCommentAction({
        ...updateCommentActionArgs,
        commentId: comment.id,
      });

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(updateCommentActionArgs.content);
    });
  });
});
