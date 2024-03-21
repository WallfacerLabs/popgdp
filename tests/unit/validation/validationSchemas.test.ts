import { errorMessages } from "@/constants/errorMessages";
import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { describe, expect, test } from "vitest";
import { SafeParseError } from "zod";

describe("specificLengthStringSchema", () => {
  const fieldName = "field";
  const minLength = 1;
  const maxLength = 500;
  const schema = specificLengthStringSchema(fieldName, minLength, maxLength);

  type ValidationError = SafeParseError<typeof schema>;

  test("rejects empty string", () => {
    const validationResult = schema.safeParse("") as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, minLength),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string with only spaces", () => {
    const validationResult = schema.safeParse(" ") as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, minLength),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string shorter than min length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(minLength - 1),
    ) as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.minLength(fieldName, minLength),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("rejects string longer than max length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(maxLength + 1),
    ) as ValidationError;
    expect(validationResult.error.errors[0].message).toBe(
      errorMessages.maxLength(fieldName, maxLength),
    );
    expect(validationResult.error.errors[0].path).toStrictEqual([]);
  });

  test("accepts string with length equal to min length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(minLength),
    ) as ValidationError;
    expect(validationResult.success).toBe(true);
  });

  test("accepts string with length equal to max length", () => {
    const validationResult = schema.safeParse(
      "a".repeat(maxLength),
    ) as ValidationError;
    expect(validationResult.success).toBe(true);
  });
});
