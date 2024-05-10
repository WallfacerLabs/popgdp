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
const commentId = "ebf07337-d290-4dc4-b310-361bd24150c5";

const defaultApplication = {
  id: applicationId,
  userId: anotherUserId,
  waveId,
  comments: [],
};

const defaultActionArgs = {
  applicationId: defaultApplication.id,
  commentId,
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
      expect(() => updateCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to edit comments",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => updateCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You are blocked from performing this action",
      );
    });

    it("device verified - other user application", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => updateCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be orb verified to edit comments under other users submissions",
      );
    });

    it("device verified - own application", async () => {
      const updatedCommentContent = "updated comment";
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      await updateCommentAction({
        ...defaultActionArgs,
        content: updatedCommentContent,
      });

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
      expect(comments[0].content).toBe(updatedCommentContent);
    });

    it("orb verified", async () => {
      const updatedCommentContent = "updated comment";
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateCommentAction({
        ...defaultActionArgs,
        content: updatedCommentContent,
      });

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
      expect(comments[0].content).toBe(updatedCommentContent);
    });

    it("reviewer", async () => {
      const updatedCommentContent = "updated comment";
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "device" });

      await updateCommentAction({
        ...defaultActionArgs,
        content: updatedCommentContent,
      });

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
      expect(comments[0].content).toBe(updatedCommentContent);
    });

    it("moderator", async () => {
      const updatedCommentContent = "updated comment";
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "device" });

      await updateCommentAction({
        ...defaultActionArgs,
        content: updatedCommentContent,
      });

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
      expect(comments[0].content).toBe(updatedCommentContent);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() => updateCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot edit comments in this wave stage",
      );
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");

      await updateCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");

      await updateCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("assesment");

      await updateCommentAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      expect(comments).toHaveLength(1);
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() => updateCommentAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot edit comments in this wave stage",
      );
    });
  });

  it("can edit comment", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await addCommentAction({
      application: defaultApplication,
      content: defaultActionArgs.content,
    });

    const comments = await db.query.Comment.findMany();
    expect(comments).toHaveLength(1);
    expect(comments[0].content).toBe(defaultActionArgs.content);

    const updatedCommentContent = "updated comment";

    await updateCommentAction({
      ...defaultActionArgs,
      content: updatedCommentContent,
    });
    expect(comments[0].content).toBe(updatedCommentContent);
  });
});
