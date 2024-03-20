import { describe, expect, test } from "vitest";

import {
  addDays,
  formatDate,
  formatDateRange,
  formatTime,
  getStartOfDate,
} from "@/lib/dates";

describe("lib/dates", () => {
  describe("formatDate", () => {
    test("should format a date", () => {
      expect(formatDate(new Date("2022-01-01 00:00:00"))).toBe("Jan 01, 2022");
    });
  });

  describe("formatTime", () => {
    test("should correctly format a Date object into a time string", () => {
      expect(formatTime(new Date("2022-01-01 00:00:00"))).toBe(
        "Jan 01, 22, 00:00",
      );
    });
  });

  describe("formatDateRange", () => {
    test("should format a date range", () => {
      expect(
        formatDateRange(
          new Date("2022-01-01 00:00:00"),
          new Date("2022-01-02 00:00:00"),
        ),
      ).toBe("Jan 01, 2022 - Jan 02, 2022");
    });
  });

  describe("getStartOfDate", () => {
    test("should get the start of a date", () => {
      expect(getStartOfDate(new Date("2022-01-01 12:00:00"))).toEqual(
        new Date("2022-01-01 00:00:00"),
      );
    });
  });

  describe("addDays", () => {
    test("should add days to a date", () => {
      expect(addDays(new Date("2022-01-01 00:00:00"), 1)).toEqual(
        new Date("2022-01-02 00:00:00"),
      );
    });

    test("should add 2 years to a date", () => {
      expect(addDays(new Date("2022-01-01 00:00:00"), 365 * 2)).toEqual(
        new Date("2024-01-01 00:00:00"),
      );
    });
  });
});
