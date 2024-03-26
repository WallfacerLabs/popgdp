import { errorMessages } from "@/constants/errorMessages";
import { describe, expect, it } from "vitest";
import { SafeParseError } from "zod";

import { mainDetailsSchema } from "@/app/waves/create/steps/mainDetails.schema";

type ValidationError = SafeParseError<mainDetailsSchema>;

const validData: mainDetailsSchema = {
  name: "First wave",
  summary: "This is the first wave",
  categories: [
    {
      description: "description",
      color: "red",
      name: "name",
    },
  ],
};

describe("/app/waves/create/steps/mainDetailsSchema", () => {
  it("no errors on valid data", () => {
    const validationResult = mainDetailsSchema.safeParse(validData);

    expect(validationResult.success).toBe(true);
  });

  describe("waveName", () => {
    it("at least 3 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        name: "",
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.minLength("Wave name", 3),
      );
    });

    it("at most 20 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        name: "a".repeat(21),
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.maxLength("Wave name", 20),
      );
    });
  });

  describe("waveSummary", () => {
    it("at least 3 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        summary: "",
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.minLength("Wave summary", 3),
      );
    });

    it("at most 160 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        summary: "a".repeat(161),
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.maxLength("Wave summary", 160),
      );
    });
  });

  describe("categories", () => {
    describe("name", () => {
      it("at least 3 characters", () => {
        const validationResult = mainDetailsSchema.safeParse({
          ...validData,
          categories: [
            {
              ...validData.categories[0],
              name: "",
            },
          ],
        } satisfies mainDetailsSchema) as ValidationError;

        expect(validationResult.success).toBe(false);
        expect(validationResult.error.issues[0].message).toBe(
          errorMessages.minLength("Category name", 3),
        );
      });

      it("at most 20 characters", () => {
        const validationResult = mainDetailsSchema.safeParse({
          ...validData,
          categories: [
            {
              ...validData.categories[0],
              name: "a".repeat(21),
            },
          ],
        } satisfies mainDetailsSchema) as ValidationError;

        expect(validationResult.success).toBe(false);
        expect(validationResult.error.issues[0].message).toBe(
          errorMessages.maxLength("Category name", 20),
        );
      });
    });

    describe("description", () => {
      it("at least 3 characters", () => {
        const validationResult = mainDetailsSchema.safeParse({
          ...validData,
          categories: [
            {
              ...validData.categories[0],
              description: "",
            },
          ],
        } satisfies mainDetailsSchema) as ValidationError;

        expect(validationResult.success).toBe(false);
        expect(validationResult.error.issues[0].message).toBe(
          errorMessages.minLength("Category description", 3),
        );
      });

      it("at most 140 characters", () => {
        const validationResult = mainDetailsSchema.safeParse({
          ...validData,
          categories: [
            {
              ...validData.categories[0],
              description: "a".repeat(141),
            },
          ],
        } satisfies mainDetailsSchema) as ValidationError;

        expect(validationResult.success).toBe(false);
        expect(validationResult.error.issues[0].message).toBe(
          errorMessages.maxLength("Category description", 140),
        );
      });
    });
  });
});
