import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createApplication,
  createBlocked,
  createCategory,
  createComment,
  createModerator,
  createReviewer,
  createUser,
  createWave,
  updateWaveStage,
} from "tests/helpers/queries";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatTime } from "@/lib/dates";
import { updateCommentAction } from "@/app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/commentActions";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";
const commentId = "5c8c268c-3a34-43ec-b8b7-58a0cbe9adde";

const initialCommentContent = "Original comment";

const updateCommentActionArgs = {
  applicationId,
  commentId,
  newContent: "Updated comment",
};

const expectedContent = `${initialCommentContent}

Edited ${formatTime(new Date())}:

${updateCommentActionArgs.newContent}`;

async function createUserComment() {
  createComment({
    content: initialCommentContent,
    applicationId,
    commentId,
    userId,
  });
}

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
      mockUserSession({ userId, credentialType: "orb" });
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() =>
        updateCommentAction(updateCommentActionArgs),
      ).rejects.toThrowError("You cannot edit comments in this wave stage");
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createUserComment();

      await updateCommentAction(updateCommentActionArgs);

      const updatedComments = await db.query.Comment.findMany();
      expect(updatedComments[0].content).toBe(expectedContent);
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() =>
        updateCommentAction(updateCommentActionArgs),
      ).rejects.toThrowError("You cannot edit comments in this wave stage");
    });
  });

  it("can edit comment", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await createUserComment();

    await updateCommentAction(updateCommentActionArgs);

    const updatedComments = await db.query.Comment.findMany();
    expect(updatedComments[0].content).toBe(expectedContent);
  });
});
