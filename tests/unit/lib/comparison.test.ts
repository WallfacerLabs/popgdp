import { describe, expect, it } from "vitest";

import { compareObjectsByProperties } from "@/lib/comparison";

const objectWithGreaterProperties = {
  date: new Date("2024-04-15"),
  number: 100,
  string: "name 2",
  nested: {
    date: new Date("2024-04-01"),
    number: 25,
    string: "name 1",
  },
};
const objectWithSmallerProperties = {
  date: new Date("2024-04-01"),
  number: 25,
  string: "name 1",
  nested: {
    date: new Date("2024-04-15"),
    number: 100,
    string: "name 2",
  },
};

describe("utils/comparison", () => {
  describe("date", () => {
    it("shallow ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["date"],
          true,
        ),
      ).toBe(1);
    });

    it("shallow descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["date"],
          false,
        ),
      ).toBe(-1);
    });

    it("nested ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "date"],
          true,
        ),
      ).toBe(-1);
    });

    it("nested descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "date"],
          false,
        ),
      ).toBe(1);
    });
  });

  describe("number", () => {
    it("shallow ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["number"],
          true,
        ),
      ).toBe(1);
    });

    it("shallow descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["number"],
          false,
        ),
      ).toBe(-1);
    });

    it("nested ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "number"],
          true,
        ),
      ).toBe(-1);
    });

    it("nested descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "number"],
          false,
        ),
      ).toBe(1);
    });
  });

  describe("string", () => {
    it("shallow ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["string"],
          true,
        ),
      ).toBe(1);
    });

    it("shallow descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["string"],
          false,
        ),
      ).toBe(-1);
    });

    it("nested ascending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "string"],
          true,
        ),
      ).toBe(-1);
    });

    it("nested descending", () => {
      expect(
        compareObjectsByProperties(
          objectWithGreaterProperties,
          objectWithSmallerProperties,
          ["nested", "string"],
          false,
        ),
      ).toBe(1);
    });
  });
});
