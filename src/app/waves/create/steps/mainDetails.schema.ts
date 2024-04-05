import { specificLengthStringSchema } from "@/constants/validationSchemas";
import { z } from "zod";

import { categoryColors } from "@/types/CategoryColor";

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
  categories: z
    .array(
      z.object({
        color: z.enum(categoryColors),
        name: specificLengthStringSchema(
          "Category name",
          FORM_FIELD_PARAMS.category.name,
        ),
        description: specificLengthStringSchema(
          "Category description",
          FORM_FIELD_PARAMS.category.description,
        ),
      }),
    )
    .min(1, { message: "At least one category is required" }),
});

export type MainDetailsSchema = z.infer<typeof mainDetailsSchema>;
