import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { z } from "zod";

export const FORM_FIELD_PARAMS = {
  waveName: {
    min: 3,
    max: 20,
  },
  waveSummary: {
    min: 3,
    max: 160,
  },
};

export const mainDetailsSchema = z.object({
  waveName: specificLengthStringSchema("Wave name", FORM_FIELD_PARAMS.waveName),
  waveSummary: specificLengthStringSchema(
    "Wave summary",
    FORM_FIELD_PARAMS.waveSummary,
  ),
});

export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;
