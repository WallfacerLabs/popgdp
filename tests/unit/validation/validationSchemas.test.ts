import { errorMessages } from "@/constants/errorMessages";
import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { describe, expect, test } from "vitest";
import { SafeParseError } from "zod";

describe("specificLengthStringSchema", () => {
  const fieldName = "field";
  const min = 1;
  const max = 500;
  const schema = specificLengthStringSchema(fieldName, { min, max });

  type ValidationError = SafeParseError<typeof schema>;

  test("rejects empty string", () => {
    const validationResult = schema.safeParse("") as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, min),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string with only spaces", () => {
    const validationResult = schema.safeParse(" ") as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, min),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string shorter than min length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(min - 1),
    ) as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, min),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string longer than max length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(max + 1),
    ) as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.maxLength(fieldName, max),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("accepts string with length equal to min length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(min),
    ) as ValidationError;
    expect(validationResult.success).toBe(true);
  });

  test("accepts string with length equal to max length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(max),
    ) as ValidationError;
    expect(validationResult.success).toBe(true);
  });
});
