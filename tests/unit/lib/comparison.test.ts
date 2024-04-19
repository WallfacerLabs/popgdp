import { describe, expect, it, suite, test } from "vitest";

import { compareObjectsByProperties } from "@/lib/comparison";

const vaultWithGreaterProperties = {
  date: new Date("2024-04-15"),
  number: 100,
  string: "name 2",
  nested: {
    date: new Date("2024-04-01"),
    number: 25,
    string: "name 1",
  },
};
const vaultWithSmallerProperties = {
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
  test("date", () => {
    suite("shallow", () => {
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

    suite("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "date"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "date"],
            false,
          ),
        ).toBe(1);
      });
    });
  });

  test("number", () => {
    suite("shallow", () => {
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

    suite("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "number"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "number"],
            false,
          ),
        ).toBe(1);
      });
    });
  });

  test("string", () => {
    suite("shallow", () => {
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

    suite("nested", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "string"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            vaultWithGreaterProperties,
            vaultWithSmallerProperties,
            ["nested", "string"],
            false,
          ),
        ).toBe(1);
      });
    });
  });
});
