import { db } from "@/drizzle/db";
import {
  ApplicationValue,
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

import { applicationValueAction } from "@/app/waves/[waveId]/applications/[applicationId]/applicationValue/applicationValueAction";

const userId = "user";
const anotherUserId = "anotherUser";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";

const defaultActionArgs = {
  application: {
    id: applicationId,
    userId: anotherUserId,
    waveId,
  },
  isChecked: false,
  value: "positive",
} as const;

describe("app/waves/[waveId]/applications/[applicationId]/applicationValue/applicationValueAction", () => {
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
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You need to be signed in to rate submissions");
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You are blocked from performing this action");
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You need to be orb verified to rate submissions");
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await applicationValueAction(defaultActionArgs);

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toHaveLength(1);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await applicationValueAction(defaultActionArgs);

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toHaveLength(1);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await applicationValueAction(defaultActionArgs);

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toHaveLength(1);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("notOpen");

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You cannot rate submissions in this wave stage");
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("open");

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You cannot rate submissions in this wave stage");
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("denoising");

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You cannot rate submissions in this wave stage");
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("assesment");

      await applicationValueAction(defaultActionArgs);

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toHaveLength(1);
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await updateWaveStage("close");

      expect(() =>
        applicationValueAction(defaultActionArgs),
      ).rejects.toThrowError("You cannot rate submissions in this wave stage");
    });
  });

  const values = ["spam", "positive"] as const;

  for (const value of values) {
    it(`can add ${value} value`, async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await applicationValueAction({
        ...defaultActionArgs,
        isChecked: false,
        value,
      });

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toStrictEqual([
        {
          applicationId,
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

      await applicationValueAction({
        ...defaultActionArgs,
        isChecked: true,
        value,
      });

      const applicationValues = await db.query.ApplicationValue.findMany();
      expect(applicationValues).toHaveLength(0);
    });
  }

  it("throws error if rating own submission", async () => {
    mockUserSession({ userId: anotherUserId, credentialType: "orb" });

    expect(() =>
      applicationValueAction(defaultActionArgs),
    ).rejects.toThrowError("You cannot rate your own submission");
  });
});
