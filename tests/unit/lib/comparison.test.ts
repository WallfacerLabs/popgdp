import { describe, expect, it } from "vitest";

import { compareObjectsByProperties } from "@/lib/comparison";

const EDGE_COMPARISON_DATE = new Date("2024-04-01");

const vaultWithGreaterProperties = {
  date: new Date("2024-04-15"),
  number: 100,
  string: "name 2",
  nested: {
    date: new Date("2024-04-15"),
    number: 100,
    string: "name 2",
  },
};
const vaultWithSmallerProperties = {
  date: new Date("2024-04-01"),
  number: 25,
  string: "name 1",
  nested: {
    date: new Date("2024-04-01"),
    number: 25,
    string: "name 1",
  },
};

describe("compareObjectsByProperties", () => {
  describe("date", () => {
    describe("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["date"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["date"],
            false,
          ),
        ).toBe(-1);
      });
    });

    describe("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "date"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "date"],
            false,
          ),
        ).toBe(-1);
      });
    });
  });

  describe("number", () => {
    describe("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["number"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["number"],
            false,
          ),
        ).toBe(-1);
      });
    });

    describe("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "number"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "number"],
            false,
          ),
        ).toBe(-1);
      });
    });
  });

  describe("string", () => {
    describe("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["string"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["string"],
            false,
          ),
        ).toBe(-1);
      });
    });

    describe("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "string"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "string"],
            false,
          ),
        ).toBe(-1);
      });
    });
  });
});
