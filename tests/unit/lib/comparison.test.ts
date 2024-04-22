import { describe, expect, it, suite, test } from "vitest";

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
  test("date", () => {
    suite("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["date"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
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
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["nested", "date"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
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
  });

  test("number", () => {
    suite("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["number"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
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
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["nested", "number"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
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
  });

  test("string", () => {
    suite("shallow", () => {
      it("ascending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["string"],
            true,
          ),
        ).toBe(1);
      });

      it("descending", () => {
        expect(
          compareObjectsByProperties(
            objectWithGreaterProperties,
            objectWithSmallerProperties,
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
            objectWithGreaterProperties,
            objectWithSmallerProperties,
            ["nested", "string"],
            true,
          ),
        ).toBe(-1);
      });

      it("descending", () => {
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
});
