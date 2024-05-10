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

import { addReviewAction } from "@/app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/addCommentAction";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";

const defaultActionArgs = {
  applicationId,
  waveId,
  content: "comment",
};

describe("app/waves/[waveId]/applications/[applicationId]/comments/addCommentForm/addReviewAction", () => {
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
      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to review",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You are blocked from performing this action",
      );
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be reviewer to review",
      );
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be reviewer to review",
      );
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addReviewAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      const reviews = await db.query.Review.findMany();
      expect(comments).toHaveLength(1);
      expect(reviews).toHaveLength(1);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await addReviewAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      const reviews = await db.query.Review.findMany();
      expect(comments).toHaveLength(1);
      expect(reviews).toHaveLength(1);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add review in this wave stage",
      );
    });

    it("open", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add review in this wave stage",
      );
    });

    it("denoising", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add review in this wave stage",
      );
    });

    it("assesment", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("assesment");

      await addReviewAction(defaultActionArgs);

      const comments = await db.query.Comment.findMany();
      const reviews = await db.query.Review.findMany();
      expect(comments).toHaveLength(1);
      expect(reviews).toHaveLength(1);
    });

    it("close", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot add review in this wave stage",
      );
    });
  });

  it("can add comment", async () => {
    await createReviewer(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await addReviewAction(defaultActionArgs);

    const comments = await db.query.Comment.findMany();
    expect(comments).toHaveLength(1);
    expect(comments[0]).toMatchObject({
      applicationId,
      content: defaultActionArgs.content,
      userId,
      replyTargetId: null,
    });
  });

  it("cant add multiple reviews", async () => {
    await createReviewer(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await addReviewAction(defaultActionArgs);
    expect(() => addReviewAction(defaultActionArgs)).rejects.toThrowError(
      "You have already reviewed this submission",
    );
  });

  it("cant add review to own application", async () => {
    await createReviewer(userId);
    mockUserSession({ userId, credentialType: "orb" });
    const newApplicationId = "cc7565e4-2a8d-4716-a91a-4c86854c762b";

    await createApplication({
      applicationId: newApplicationId,
      categoryId,
      userId,
      waveId,
      isDraft: false,
    });

    expect(() =>
      addReviewAction({
        ...defaultActionArgs,
        applicationId: newApplicationId,
      }),
    ).rejects.toThrowError("You cannot review your own submission");
  });

  it("cant add review to application that does not exist", async () => {
    await createReviewer(userId);
    mockUserSession({ userId, credentialType: "orb" });
    const newApplicationId = "cc7565e4-2a8d-4716-a91a-4c86854c762b";

    expect(() =>
      addReviewAction({
        ...defaultActionArgs,
        applicationId: newApplicationId,
      }),
    ).rejects.toThrowError("Application not found");
  });
});
