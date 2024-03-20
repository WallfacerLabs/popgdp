import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { describe, expect, test } from "vitest";

describe("specificLengthStringSchema", () => {
  const fieldName = "field";
  const minLength = 1;
  const maxLength = 500;
  const schema = specificLengthStringSchema(fieldName, minLength, maxLength);

  test("rejects empty string", () => {
    expect(() => schema.parse("")).toThrow();
  });

  test("rejects string with only spaces", () => {
    expect(() => schema.parse(" ")).toThrow();
  });

  test("rejects string shorter than min length", () => {
    expect(() => schema.parse("a".repeat(minLength - 1))).toThrow();
  });

  test("rejects string longer than max length", () => {
    expect(() => schema.parse("a".repeat(maxLength + 1))).toThrow();
  });

  test("accepts string with length equal to min length", () => {
    expect(schema.parse("a".repeat(minLength))).toBe("a".repeat(minLength));
  });

  test("accepts string with length equal to max length", () => {
    expect(schema.parse("a".repeat(maxLength))).toBe("a".repeat(maxLength));
  });
});
