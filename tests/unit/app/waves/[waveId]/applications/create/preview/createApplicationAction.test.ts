import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createBlocked,
  createCategory,
  createModerator,
  createReviewer,
  createUser,
  createWave,
  updateWaveStage,
} from "tests/helpers/queries";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createApplicationAction } from "@/app/waves/[waveId]/applications/create/preview/createApplicationAction";

const waveId = 0;
const categoryId = "8e60662c-e935-48dd-9493-76139d5bf950";
const userId = "0";

const applicationData = {
  name: "Application",
  summary: "Application summary",
  entityName: "Entity",
  email: "email.com",
  duration: 12,
  budget: 100,
  categoryId,
  goals: "Goals",
  idea: "Idea",
  members: [],
  reason: "Reason",
  requirements: "Requirements",
  state: "State",
  teamSummary: "Team summary",
  tbd: "TBD",
  tbdb: "TBDB",
};

describe("app/waves/create/createWaveAction", () => {
  beforeEach(async () => {
    await createWave(waveId);
    await updateWaveStage("open");
    await createCategory({ waveId, categoryId });
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
      await createUser(userId);

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You need to be signed in to apply");
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You are blocked from performing this action");
    });

    it("device verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });

      await createApplicationAction(applicationData, waveId, false);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
    });

    it("orb verified", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await createApplicationAction(applicationData, waveId, false);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await createApplicationAction(applicationData, waveId, false);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await createApplicationAction(applicationData, waveId, false);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
    });
  });

  describe("wave stages", () => {
    it("not open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("notOpen");

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You cannot apply in this wave stage");
    });

    it("open", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("open");

      await createApplicationAction(applicationData, waveId, false);

      const applications = await db.query.Application.findMany();
      expect(applications).toHaveLength(1);
    });

    it("denoising", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("denoising");

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You cannot apply in this wave stage");
    });

    it("assesment", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("assesment");

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You cannot apply in this wave stage");
    });

    it("close", async () => {
      await createUser(userId);
      mockUserSession({ userId, credentialType: "device" });
      await updateWaveStage("close");

      expect(() =>
        createApplicationAction(applicationData, waveId, false),
      ).rejects.toThrowError("You cannot apply in this wave stage");
    });
  });

  it("should create an application", async () => {
    await createUser(userId);
    mockUserSession({ userId, credentialType: "device" });

    await createApplicationAction(applicationData, waveId, false);

    const applications = await db.query.Application.findMany();
    expect(applications).toHaveLength(1);

    expect(applications[0]).toMatchObject({
      draft: false,
      name: applicationData.name,
      summary: applicationData.summary,
      entityName: applicationData.entityName,
      email: applicationData.email,
      duration: String(applicationData.duration),
      budget: applicationData.budget,
      categoryId,
      teamSummary: applicationData.teamSummary,
      idea: applicationData.idea,
      reason: applicationData.reason,
      state: applicationData.state,
      goals: applicationData.goals,
      requirements: applicationData.requirements,
      tbd: applicationData.tbd,
      imageId: null,
      waveId,
      userId,
    });
  });
});
