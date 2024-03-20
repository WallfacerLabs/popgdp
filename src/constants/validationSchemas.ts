import { z } from "zod";

import { errorMessages } from "./errorMessages";

export const numberSchema = (fieldName: string) => {
  return z
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
