import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { mockUserSession } from "tests/helpers/mockUserSession";
import {
  createBlocked,
  createModerator,
  createReviewer,
} from "tests/helpers/queries";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createWaveAction } from "@/app/waves/create/createWaveAction";
import { type WaveData } from "@/app/waves/create/stepsProvider";

const inputDate = new Date("2024-05-15 15:30:00");
const expectedDate = new Date("2024-05-15T00:00:00.000Z");

const WAVE_DATA: WaveData = {
  name: "Wave",
  summary: "Summary",
  openStartDate: inputDate,
  denoisingStartDate: inputDate,
  assesmentStartDate: inputDate,
  closeDate: inputDate,
  categories: [
    {
      color: "blue",
      description: "description",
      name: "name",
    },
  ],
};

describe("app/waves/create/createWaveAction", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    await db.delete(Wave);

    vi.clearAllMocks();
  });

  const userId = "0";

  describe("permissions", () => {
    it("visitor", async () => {
      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("blocked", async () => {
      await createBlocked(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("device verified", async () => {
      mockUserSession({ userId, credentialType: "device" });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("orb verified", async () => {
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("reviewer", async () => {
      await createReviewer(userId);
      mockUserSession({ userId, credentialType: "orb" });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("moderator", async () => {
      await createModerator(userId);
      mockUserSession({ userId, credentialType: "orb" });

      await createWaveAction(WAVE_DATA);

      const waves = await db.query.Wave.findMany();
      expect(waves).toHaveLength(1);
      expect(waves[0]).toMatchObject({
        name: WAVE_DATA.name,
        summary: WAVE_DATA.summary,
        openStartDate: expectedDate,
        denoisingStartDate: expectedDate,
        assesmentStartDate: expectedDate,
        closeDate: expectedDate,
      });

      const categories = await db.query.Category.findMany();
      expect(categories).toHaveLength(1);
      expect(categories[0]).toMatchObject({
        waveId: waves[0].id,
        color: WAVE_DATA.categories[0].color,
        description: WAVE_DATA.categories[0].description,
        name: WAVE_DATA.categories[0].name,
      });
    });
  });
});
