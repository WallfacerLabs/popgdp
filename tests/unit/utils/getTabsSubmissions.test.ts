import { getTabsSubmissions } from "@/utils/getTabsSubmissions";
import { describe, expect, test } from "vitest";

import { Application } from "@/types/Application";
import { UserId } from "@/types/User";

describe("hooks/getTabsSubmissions", () => {
  test("filtered submissions list", () => {
    const applications = [
      { id: "1", userId: "user1", draft: true },
      { id: "2", userId: "user2", draft: false },
      { id: "3", userId: "user1", draft: false },
      { id: "4", userId: "user3", draft: true },
    ] as Application[];

    const { allApplications, userApplications } = getTabsSubmissions({
      applications,
      userId: "user1" as UserId,
    });

    expect(allApplications).toEqual(applications.slice(0, 3));
    expect(userApplications).toEqual(
      applications.filter((application) => application.userId === "user1"),
    );
  });
});
