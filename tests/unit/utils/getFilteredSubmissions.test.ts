import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";
import { describe, expect, test } from "vitest";

import { Application } from "@/types/Application";

const CATEGORIES_MOCK = {
  all: "all",
  first: "first",
  second: "second",
};

const APPLICATIONS_MOCK = [
  {
    id: "1",
    name: "First Applications",
    userId: "user1",
    category: { id: "first" },
  },
  {
    id: "2",
    name: "Second Applications",
    userId: "user1",
    category: { id: "second" },
  },
  {
    id: "3",
    name: "Third Applications",
    userId: "user2",
    category: { id: "first" },
  },
  {
    id: "4",
    name: "Fourth Applications",
    userId: "user3",
    category: { id: "second" },
  },
] as Application[];

describe("hooks/getFilteredSubmissions", () => {
  test("default filters", () => {
    const filteredApplications = getFilteredSubmissions({
      applications: APPLICATIONS_MOCK,
      category: CATEGORIES_MOCK.all,
      search: "",
    });

    expect(filteredApplications).toEqual(APPLICATIONS_MOCK);
  });

  test("search filter", () => {
    const filteredApplications = getFilteredSubmissions({
      applications: APPLICATIONS_MOCK,
      category: CATEGORIES_MOCK.all,
      search: "First",
    });

    expect(filteredApplications).toEqual([APPLICATIONS_MOCK[0]]);
  });

  test("category filter", () => {
    const filteredApplications = getFilteredSubmissions({
      applications: APPLICATIONS_MOCK,
      category: CATEGORIES_MOCK.first,
      search: "",
    });

    expect(filteredApplications).toEqual([
      APPLICATIONS_MOCK[0],
      APPLICATIONS_MOCK[2],
    ]);
  });
});
