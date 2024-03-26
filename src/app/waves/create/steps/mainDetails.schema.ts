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
  category: {
    name: {
      min: 3,
      max: 20,
    },
    description: {
      min: 3,
      max: 140,
    },
  },
} as const;

export const mainDetailsSchema = z.object({
  name: specificLengthStringSchema("Wave name", FORM_FIELD_PARAMS.name),
  summary: specificLengthStringSchema(
    "Wave summary",
    FORM_FIELD_PARAMS.summary,
  ),
  categories: z.array(
    z.object({
      icon: z.string(),
      name: specificLengthStringSchema(
        "Category name",
        FORM_FIELD_PARAMS.category.name,
      ),
      description: specificLengthStringSchema(
        "Category description",
        FORM_FIELD_PARAMS.category.description,
      ),
    }),
  ),
});

export type mainDetailsSchema = z.infer<typeof mainDetailsSchema>;
