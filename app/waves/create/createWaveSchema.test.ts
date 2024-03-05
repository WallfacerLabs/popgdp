import { errorMessages } from "@/constants/errorMessages";
import { describe, expect, it } from "vitest";
import { SafeParseError } from "zod";

import { createWaveSchema } from "@/app/waves/create/createWaveSchema";

type ValidationError = SafeParseError<createWaveSchema>;

const validData: createWaveSchema = {
  waveName: "First wave",
  duration: {
    from: new Date("2022-01-01 00:00:00"),
    to: new Date("2022-01-02 00:00:00"),
  },
};

describe("/app/waves/create/createWaveSchema", () => {
  it("no errors on valid data", () => {
    const validationResult = createWaveSchema.safeParse(validData);

    expect(validationResult.success).toBe(true);
  });

  describe("waveName", () => {
    it("at least 3 characters", () => {
      const validationResult = createWaveSchema.safeParse({
        ...validData,
        waveName: "",
      } satisfies createWaveSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.minLength("Wave name", 3),
      );
    });

    it("at most 50 characters", () => {
      const validationResult = createWaveSchema.safeParse({
        ...validData,
        waveName: "a".repeat(51),
      } satisfies createWaveSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.maxLength("Wave name", 50),
      );
    });
  });

  describe("duration", () => {
    it("no from value", () => {
      const validationResult = createWaveSchema.safeParse({
        ...validData,
        duration: { ...validData.duration, from: undefined as any },
      } satisfies createWaveSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.required("Start date"),
      );
    });

    it("no to value", () => {
      const validationResult = createWaveSchema.safeParse({
        ...validData,
        duration: { ...validData.duration, to: undefined as any },
      } satisfies createWaveSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.required("End date"),
      );
    });

    it("both from and to values are empty", () => {
      const validationResult = createWaveSchema.safeParse({
        ...validData,
        duration: { from: undefined as any, to: undefined as any },
      } satisfies createWaveSchema) as ValidationError;

      expect(validationResult.success).toBe(false);
      expect(validationResult.error.issues[0].message).toBe(
        errorMessages.required("Start date"),
      );
      expect(validationResult.error.issues[1].message).toBe(
        errorMessages.required("End date"),
      );
    });
  });
});
