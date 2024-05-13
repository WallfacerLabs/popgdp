import { describe, expect, it } from "vitest";

import { sortObjectsByKey } from "@/lib/sort";

const smallestObject = {
  date: new Date("2024-01-01"),
  number: 100,
  string: "name 1",
  nested: {
    date: new Date("2024-02-02"),
    number: 200,
    string: "name 1.1",
  },
};

const middleObject = {
  date: new Date("2024-01-02"),
  number: 200,
  string: "name 2",
  nested: {
    date: new Date("2024-02-04"),
    number: 400,
    string: "name 2.1",
  },
};

const largestObject = {
  date: new Date("2024-01-03"),
  number: 300,
  string: "name 3",
  nested: {
    date: new Date("2024-02-06"),
    number: 600,
    string: "name 3.1",
  },
};

const initialArray = [smallestObject, middleObject, largestObject];

describe("utils/sort", () => {
  describe("date", () => {
    it("shallow ascending", () => {
      expect(sortObjectsByKey(initialArray, ["date"], true)).toStrictEqual([
        smallestObject,
        middleObject,
        largestObject,
      ]);
    });

    it("shallow descending", () => {
      expect(sortObjectsByKey(initialArray, ["date"], false)).toStrictEqual([
        largestObject,
        middleObject,
        smallestObject,
      ]);
    });

    it("nested ascending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "date"], true),
      ).toStrictEqual([smallestObject, middleObject, largestObject]);
    });

    it("nested descending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "date"], false),
      ).toStrictEqual([largestObject, middleObject, smallestObject]);
    });
  });

  describe("number", () => {
    it("shallow ascending", () => {
      expect(sortObjectsByKey(initialArray, ["number"], true)).toStrictEqual([
        smallestObject,
        middleObject,
        largestObject,
      ]);
    });

    it("shallow descending", () => {
      expect(sortObjectsByKey(initialArray, ["number"], false)).toStrictEqual([
        largestObject,
        middleObject,
        smallestObject,
      ]);
    });

    it("nested ascending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "number"], true),
      ).toStrictEqual([smallestObject, middleObject, largestObject]);
    });

    it("nested descending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "number"], false),
      ).toStrictEqual([largestObject, middleObject, smallestObject]);
    });
  });

  describe("string", () => {
    it("shallow ascending", () => {
      expect(sortObjectsByKey(initialArray, ["string"], true)).toStrictEqual([
        smallestObject,
        middleObject,
        largestObject,
      ]);
    });

    it("shallow descending", () => {
      expect(sortObjectsByKey(initialArray, ["string"], false)).toStrictEqual([
        largestObject,
        middleObject,
        smallestObject,
      ]);
    });

    it("nested ascending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "string"], true),
      ).toStrictEqual([smallestObject, middleObject, largestObject]);
    });

    it("nested descending", () => {
      expect(
        sortObjectsByKey(initialArray, ["nested", "string"], false),
      ).toStrictEqual([largestObject, middleObject, smallestObject]);
    });
  });
});
