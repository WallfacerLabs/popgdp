import { errorMessages } from "@/constants/errorMessages";
import { describe, expect, it } from "vitest";
import { SafeParseError } from "zod";

import { mainDetailsSchema } from "@/app/waves/create/steps/mainDetails.schema";

type ValidationError = SafeParseError<mainDetailsSchema>;

const validData: mainDetailsSchema = {
  waveName: "First wave",
  waveSummary: "This is the first wave",
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
        waveName: "",
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.minLength("Wave name", 3),
      );
    });

    it("at most 20 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        waveName: "a".repeat(21),
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
        waveSummary: "",
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.minLength("Wave summary", 3),
      );
    });

    it("at most 160 characters", () => {
      const validationResult = mainDetailsSchema.safeParse({
        ...validData,
        waveSummary: "a".repeat(161),
      } satisfies mainDetailsSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.maxLength("Wave summary", 160),
      );
    });
  });
});
