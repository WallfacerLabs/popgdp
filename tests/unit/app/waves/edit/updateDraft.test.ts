import { db } from "@/drizzle/db";
import { Application, User } from "@/drizzle/schema";
import {
  clearSession,
  getSession,
  setUser,
  user,
} from "tests/helpers/getSession";
import { afterEach, describe, expect, it } from "vitest";

import { updateDraftAction } from "@/app/waves/[waveId]/applications/[applicationId]/edit/preview/updateDraftAction";
import { createApplicationAction } from "@/app/waves/[waveId]/applications/create/preview/createApplicationAction";
import { ApplicationData } from "@/app/waves/[waveId]/applications/create/stepsProvider";

describe("updateDraft", () => {
  const userId = "0";

  afterEach(async () => {
    await db.delete(User);
    // clearSession();
  });

  async function createApplicationDraft(application: ApplicationData) {
    console.log("set user, current user:", user, "getSession: ", getSession());
    setUser({ sub: `oauth2|worldcoin|${userId}`, credentialType: "orb" });
    console.log(
      "after set user, current user:",
      user,
      "getSession: ",
      getSession(),
    );
    await db.insert(User).values({ id: userId, ethereumAddress: "0x0" });
    console.log(
      "insert user, current user:",
      user,
      "getSession: ",
      getSession(),
    );
    await createApplicationAction(application, 0, true);
  }

  it("change project name", async () => {
    const application: ApplicationData = {
      name: "",
      summary: "",
      entityName: "",
      email: "",
      duration: 0,
      budget: 0,
      categoryId: "",
      teamSummary: "",
      idea: "",
      reason: "",
      state: "",
      goals: "",
      requirements: "",
      tbd: "",
      members: [
        {
          name: "",
          position: "",
        },
      ],
      tbdb: "",
    };
    console.log("create application draft");
    await createApplicationDraft(application);

    await updateDraftAction(application, 0, false);
  });
});
