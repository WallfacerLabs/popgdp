import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createBlocked,
  createModerator,
  createReviewer,
  createUser,
} from "tests/helpers/queries";
import { afterEach, describe, expect, it, vi } from "vitest";

import { updateReviewersAction } from "@/app/moderator/reviewers/updateReviewersAction";

const userId = "0";
const reviewer = {
  ethereumAddress: "0x1",
};

describe("app/waves/create/createWaveAction", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);

    vi.clearAllMocks();
  });

  describe("permissions", () => {
    it("visitor", async () => {
      await createUser(userId);

      expect(() => updateReviewersAction([])).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => updateReviewersAction([reviewer])).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => updateReviewersAction([reviewer])).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => updateReviewersAction([reviewer])).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => updateReviewersAction([reviewer])).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await updateReviewersAction([reviewer]);

      const reviewers = await db.query.Reviewer.findMany();
      expect(reviewers).toHaveLength(1);
    });
  });

  it("should add reviewers", async () => {
    await createModerator(userId);
    mockUserSession({ userId, credentialType: "orb" });

    const reviewers = [
      { ethereumAddress: "0x1" },
      { ethereumAddress: "0x2" },
      { ethereumAddress: "0x3" },
      { ethereumAddress: "0x4" },
      { ethereumAddress: "0x5" },
    ];

    await updateReviewersAction(reviewers);

    const dbReviewers = await db.query.Reviewer.findMany();
    expect(dbReviewers).toHaveLength(5);
    expect(dbReviewers).toStrictEqual(reviewers);
  });

  it("can remove reviewers by passing empty array", async () => {
    await createModerator(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await updateReviewersAction([reviewer]);

    const reviewers = await db.query.Reviewer.findMany();
    expect(reviewers).toHaveLength(1);

    await updateReviewersAction([]);

    const updatedReviewers = await db.query.Reviewer.findMany();
    expect(updatedReviewers).toHaveLength(0);
  });

  it("can replace old reviewers", async () => {
    await createModerator(userId);
    mockUserSession({ userId, credentialType: "orb" });

    await updateReviewersAction([{ ethereumAddress: "0x5" }]);

    const reviewers = await db.query.Reviewer.findMany();
    expect(reviewers).toStrictEqual([{ ethereumAddress: "0x5" }]);

    await updateReviewersAction([
      { ethereumAddress: "0x8" },
      { ethereumAddress: "0x9" },
    ]);

    const updatedReviewers = await db.query.Reviewer.findMany();
    expect(updatedReviewers).toStrictEqual([
      { ethereumAddress: "0x8" },
      { ethereumAddress: "0x9" },
    ]);
  });
});
