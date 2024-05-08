import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createApplication,
  createBlocked,
  createCategory,
  createModerator,
  createReviewer,
  createUser,
  createWave,
} from "tests/helpers/queries";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getWaveStage } from "@/config/waveStages";
import { addDays } from "@/lib/dates";
import { publishDraftAction } from "@/app/waves/[waveId]/applications/[applicationId]/applicationUserButtons/publishDraftAction";

const userId = "user";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";

const defaultActionArgs = {
  id: applicationId,
  userId,
  waveId,
} as const;

describe("app/waves/[waveId]/applications/[applicationId]/applicationUserButtons/publishDraftAction", () => {
  beforeEach(async () => {
    await createWave(waveId);
    await createCategory({ categoryId, waveId });
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
      expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to publish draft",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You are blocked from performing this action",
      );
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await publishDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await publishDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await publishDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await publishDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });
  });

  describe("wave stages", () => {
    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await publishDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("denoising", async () => {
      const [updatedWave] = await db
        .update(Wave)
        .set({ denoisingStartDate: addDays(new Date(), -1) })
        .where(eq(Wave.id, waveId))
        .returning();

      expect(getWaveStage(updatedWave)).toBe("denoising");

      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot publish draft in this wave stage",
      );
    });

    it("assesment", async () => {
      const [updatedWave] = await db
        .update(Wave)
        .set({ assesmentStartDate: addDays(new Date(), -1) })
        .returning();

      expect(getWaveStage(updatedWave)).toBe("assesment");

      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot publish draft in this wave stage",
      );
    });

    it("close", async () => {
      const [updatedWave] = await db
        .update(Wave)
        .set({ closeDate: addDays(new Date(), -1) })
        .returning();

      expect(getWaveStage(updatedWave)).toBe("close");

      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot publish draft in this wave stage",
      );
    });
  });

  it("throws error if other user tries to publish application", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "orb" });

    expect(() =>
      publishDraftAction({ ...defaultActionArgs, userId: "randomUserId" }),
    ).rejects.toThrowError("Invalid user id");
  });

  it("throws error if application does not exist", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });

    expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
      "Application not found",
    );
  });

  it("throws error if application is not a draft", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });
    await createApplication({
      applicationId,
      categoryId,
      userId,
      waveId,
      isDraft: false,
    });

    expect(() => publishDraftAction(defaultActionArgs)).rejects.toThrowError(
      "Application not found",
    );
  });
});
