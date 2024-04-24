import { db } from "@/drizzle/db";
import { insertApplication } from "@/drizzle/queries/applications";
import { insertWave } from "@/drizzle/queries/waves";
import { Moderator, Reviewer, User, Wave } from "@/drizzle/schema";
import { MOCK_MEMBERS } from "tests/helpers/mockMembers";
import { MOCK_SUBMISSION_DATA } from "tests/helpers/mockSubmissionData";
import { afterEach, describe, it, vi } from "vitest";

import { addDays } from "@/lib/dates";
import { WaveData } from "@/app/waves/create/stepsProvider";

const MOCK_WAVE_DATA: Omit<WaveData, "categories"> = {
  name: "Wave",
  summary: "Summary",
  openStartDate: new Date(),
  denoisingStartDate: addDays(new Date(), 1),
  assesmentStartDate: addDays(new Date(), 2),
  closeDate: addDays(new Date(), 3),
};

const MOCK_WAVE_CATEGORY: Pick<WaveData, "categories">["categories"][number] = {
  color: "blue",
  description: "description",
  name: "name",
};

const { mockedGetSession } = vi.hoisted(() => ({ mockedGetSession: vi.fn() }));

vi.mock("@auth0/nextjs-auth0", () => ({ getSession: mockedGetSession }));
vi.mock("next/cache");
vi.mock("next/navigation");
vi.mock("next/headers", () => {
  return {
    cookies() {
      return {
        get() {
          return true;
        },
      };
    },
  };
});

describe("app/waves/applications/updateDraftAction", () => {
  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    await db.delete(Wave);

    vi.clearAllMocks();
  });

  const userEthereumAddress = "0x88009922334455";
  const userId = "0";

  async function createUser() {
    await db.insert(Moderator).values({ ethereumAddress: userEthereumAddress });
    await db
      .insert(User)
      .values({ id: userId, ethereumAddress: userEthereumAddress });
  }

  it("update and save as draft", async () => {
    await createUser();
    mockedGetSession.mockResolvedValue({
      user: {
        sub: `oauth2|worldcoin|${userId}`,
        credentialType: "orb",
      },
    });

    const waveId = await insertWave(MOCK_WAVE_DATA, [MOCK_WAVE_CATEGORY]);

    await insertApplication(
      {
        userId,
        waveId,
        draft: true,
        ...MOCK_SUBMISSION_DATA,
        duration: MOCK_SUBMISSION_DATA.duration.toString(),
      },
      MOCK_MEMBERS,
    );

    // const expectedName = "Expected name"

    // await updateDraftAction({ ...MOCK_SUBMISSION_DATA, members: MOCK_MEMBERS, name: expectedName }, waveId, true);

    // const updatedApplication = await db.query.Application.findMany();

    // console.log('app: ', updatedApplication)

    // expect(updatedApplication.name).toBe("Updated Name");

    // expect(updatedApplication.draft).toBe(true);
  });
});
