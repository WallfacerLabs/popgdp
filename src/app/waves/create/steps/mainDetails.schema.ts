import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { z } from "zod";

export const FORM_FIELD_PARAMS = {
  name: {
    min: 3,
    max: 20,
  },
  summary: {
    min: 3,
    max: 160,
  },
} as const;

export const mainDetailsSchema = z.object({
  name: specificLengthStringSchema("Wave name", FORM_FIELD_PARAMS.name),
  summary: specificLengthStringSchema(
    "Wave summary",
    FORM_FIELD_PARAMS.summary,
  ),
});

export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;
