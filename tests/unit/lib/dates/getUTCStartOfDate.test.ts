import { describe, expect, it } from "vitest";

import { getUTCStartOfDate } from "@/lib/dates";

const testCases = [
  "2023-05-15T12:00:00-07:00",
  "2023-05-15T12:00:00+05:30",
  "2023-05-15T12:00:00Z",
  "2023-05-15T23:59:59+05:30",
  "2023-05-15T00:00:01-07:00",
];
const expected = "2023-05-15T00:00:00.000Z";

describe("lib/dates/getUTCStarOfDate", () => {
  for (const testCase of testCases) {
    it(testCase, () => {
      const utcDate = getUTCStartOfDate(new Date(testCase));
      expect(utcDate).toStrictEqual(new Date(expected));
    });
  }
});
