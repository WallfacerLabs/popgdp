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

import { updateDraftAction } from "@/app/waves/[waveId]/applications/[applicationId]/edit/preview/updateDraftAction";

const userId = "user";
const waveId = 1;
const applicationId = "f8e46fab-f2c4-4c46-85ca-9e5cbf716d39";
const categoryId = "7979fbc1-1a84-4b75-8f7e-bea6f9bf0a99";

const defaultActionArgs = {
  waveId,
  applicationId,
  isDraft: false,
  applicationData: {
    name: "New Application",
    summary: "New Application summary",
    entityName: "NewEntity",
    email: "new email.com",
    duration: 1_000_000,
    budget: 1_000_000,
    categoryId,
    goals: "New Goals",
    idea: "New Idea",
    members: [],
    reason: "New Reason",
    requirements: "New Requirements",
    state: "New State",
    teamSummary: "New Team summary",
    tbd: "New TBD",
    tbdb: "New TBDB",
  },
};

describe("app/waves/[waveId]/applications/[applicationId]/applicationUserButtons/updateDraftAction", () => {
  beforeEach(async () => {
    await createWave(waveId);
    await updateWaveStage("open");
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
      expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You need to be signed in to edit",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
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

      await updateDraftAction(defaultActionArgs);

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

      await updateDraftAction(defaultActionArgs);

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

      await updateDraftAction(defaultActionArgs);

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

      await updateDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("notOpen");
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot edit submission in this wave stage",
      );
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("open");
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await updateDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("denoising");
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      await updateDraftAction(defaultActionArgs);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
      expect(applications[0].draft).toBe(false);
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("assesment");
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot edit submission in this wave stage",
      );
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("close");
      await createApplication({
        applicationId,
        categoryId,
        userId,
        waveId,
        isDraft: true,
      });

      expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
        "You cannot edit submission in this wave stage",
      );
    });
  });

  it("throws error if other user tries to publish application", async () => {
    await createUser(userId);
    mockUserSession({ userId: "randomUserId", credentialType: "orb" });
    await createApplication({
      applicationId,
      categoryId,
      userId,
      waveId,
      isDraft: true,
    });

    expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
      "You can only edit your own submission",
    );
  });

  it("throws error if application does not exist", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });

    expect(() => updateDraftAction(defaultActionArgs)).rejects.toThrowError(
      "Application not found",
    );
  });

  it("updates all fields", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });
    await updateWaveStage("denoising");
    await createApplication({
      applicationId,
      categoryId,
      userId,
      waveId,
      isDraft: true,
    });

    await updateDraftAction(defaultActionArgs);

    const applications = await db.query.Application.findMany();
    expect(applications).toHaveLength(1);
    expect(applications[0]).toMatchObject({
      budget: defaultActionArgs.applicationData.budget,
      duration: String(defaultActionArgs.applicationData.duration),
      email: defaultActionArgs.applicationData.email,
      entityName: defaultActionArgs.applicationData.entityName,
      goals: defaultActionArgs.applicationData.goals,
      idea: defaultActionArgs.applicationData.idea,
      name: defaultActionArgs.applicationData.name,
      reason: defaultActionArgs.applicationData.reason,
      requirements: defaultActionArgs.applicationData.requirements,
      state: defaultActionArgs.applicationData.state,
      summary: defaultActionArgs.applicationData.summary,
      tbd: defaultActionArgs.applicationData.tbd,
      teamSummary: defaultActionArgs.applicationData.teamSummary,
    });
  });
});
