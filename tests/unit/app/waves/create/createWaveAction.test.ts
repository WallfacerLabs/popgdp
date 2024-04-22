import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";
import { getUser } from "tests/helpers/getUser";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createWaveAction } from "@/app/waves/create/createWaveAction";
import { type WaveData } from "@/app/waves/create/stepsProvider";

const { mockedGetSession } = vi.hoisted(() => ({ mockedGetSession: vi.fn() }));

vi.mock("@auth0/nextjs-auth0", () => ({ getSession: mockedGetSession }));
vi.mock("next/cache");
vi.mock("next/navigation");

const WAVE_DATA: WaveData = {
  name: "Wave",
  summary: "Summary",
  openStartDate: new Date(),
  denoisingStartDate: new Date(),
  assesmentStartDate: new Date(),
  closeDate: new Date(),
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

    vi.clearAllMocks();
  });

  const ethereumAddress = "0x88009922334455";
  const id = "1";

  async function createModerator() {
    await db.insert(Moderator).values({ ethereumAddress });
    await db.insert(User).values({ id, ethereumAddress });
  }

  async function createReviewer() {
    await db.insert(Reviewer).values({ ethereumAddress });
    await db.insert(User).values({ id, ethereumAddress });
  }

  async function createBlocked() {
    await db.insert(User).values({ id, isBlocked: true });
  }

  describe("permissions", () => {
    it("visitor", async () => {
      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("blocked", async () => {
      await createBlocked();
      mockedGetSession.mockResolvedValue({
        user: getUser({ id, credentialType: "orb" }),
      });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("device verified", async () => {
      mockedGetSession.mockResolvedValue({
        user: getUser({ id, credentialType: "device" }),
      });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("orb verified", async () => {
      mockedGetSession.mockResolvedValue({
        user: getUser({ id, credentialType: "orb" }),
      });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("reviewer", async () => {
      await createReviewer();
      mockedGetSession.mockResolvedValue({
        user: getUser({ id, credentialType: "orb" }),
      });

      expect(() => createWaveAction(WAVE_DATA)).rejects.toThrowError(
        "Unauthorized",
      );
    });

    it("moderator", async () => {
      await createModerator();
      mockedGetSession.mockResolvedValue({
        user: getUser({ id, credentialType: "orb" }),
      });

      await createWaveAction(WAVE_DATA);
    });
  });
});
