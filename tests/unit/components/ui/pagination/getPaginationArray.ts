import { describe, expect, test } from "vitest";

import { getPaginationArray } from "@/components/ui/pagination/getPaginationArray";

describe("/components/ui/pagination/getPaginationArray", () => {
  test("currentPage: 5, totalPages: 100", () => {
    const pageNumbers = getPaginationArray({ currentPage: 5, totalPages: 100 });

    expect(pageNumbers).toEqual([1, "...", 4, 5, 6, "...", 100]);
  });

  test("currentPage: 1, totalPages: 100", () => {
    const pageNumbers = getPaginationArray({ currentPage: 1, totalPages: 100 });

    expect(pageNumbers).toEqual([1, 2, 3, 4, 5, "...", 100]);
  });

  test("currentPage: 100, totalPages: 100", () => {
    const pageNumbers = getPaginationArray({
      currentPage: 100,
      totalPages: 100,
    });

    expect(pageNumbers).toEqual([1, "...", 96, 97, 98, 99, 100]);
  });

  test("currentPage: 1, totalPages: 3", () => {
    const pageNumbers = getPaginationArray({ currentPage: 1, totalPages: 3 });

    expect(pageNumbers).toEqual([1, 2, 3]);
  });

  test("currentPage: 2, totalPages: 0", () => {
    const pageNumbers = getPaginationArray({ currentPage: 2, totalPages: 0 });

    expect(pageNumbers).toEqual([]);
  });
});
