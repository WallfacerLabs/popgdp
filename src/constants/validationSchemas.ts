import { z } from "zod";

import { errorMessages } from "./errorMessages";

export const numberSchema = (fieldName: string) => {
  return z.coerce
    .string()
    .min(1, { message: errorMessages.nonEmptyString(fieldName) })
    .regex(/^[-]?(0?\.\d+|\d+(\.\d+)?)$/, {
      message: errorMessages.number(fieldName),
    })
    .transform((value) => Number(value));
};

export const positiveNumberSchema = (fieldName: string) => {
  return numberSchema(fieldName).refine((value) => value > 0, {
    message: errorMessages.positiveNumber(fieldName),
  });
};

export const specificLengthStringSchema = (
  fieldName: string,
  { min, max }: { min: number; max: number },
) => {
  return z
    .string()
    .max(max, { message: errorMessages.maxLength(fieldName, max) })
    .trim()
    .min(min, { message: errorMessages.minLength(fieldName, min) });
};

export const imageSchema = z.object({
  id: z.string(),
  placeholder: z.string(),
  width: z.number(),
  height: z.number(),
});

export type ImageData = z.infer<typeof imageSchema>;
