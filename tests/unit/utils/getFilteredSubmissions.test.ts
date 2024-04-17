import { getFilteredSubmissions } from "@/utils/getFilteredSubmissions";
import { describe, expect, test } from "vitest";

import { Application } from "@/types/Application";

const CATEGORIES_MOCK = {
  all: "all",
  first: "first",
  second: "second",
};

const APPLICATIONS_MOCK = [
  { id: "1", name: "First Applications", userId: "user1", categoryId: "first" },
  {
    id: "2",
    name: "Second Applications",
    userId: "user1",
    categoryId: "second",
  },
  { id: "3", name: "Third Applications", userId: "user2", categoryId: "first" },
  {
    id: "4",
    name: "Fourth Applications",
    userId: "user3",
    categoryId: "second",
  },
] as Application[];

describe("hooks/useFilteredSubmissions", () => {
  test("returns all applications for default filters", () => {
    const filteredApplications = getFilteredSubmissions({
      applications: APPLICATIONS_MOCK,
      category: CATEGORIES_MOCK.all,
      search: "",
    });

    expect(filteredApplications).toEqual(APPLICATIONS_MOCK);
  });

  test("returns applications filtered by name", () => {
    const filteredApplications = getFilteredSubmissions({
      applications: APPLICATIONS_MOCK,
      category: CATEGORIES_MOCK.all,
      search: "First",
    });

    expect(filteredApplications).toEqual([APPLICATIONS_MOCK[0]]);
  });

  test("returns applications filtered by category", () => {
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
