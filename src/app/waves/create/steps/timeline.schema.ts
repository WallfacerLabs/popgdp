import { errorMessages } from "@/constants/errorMessages";
import { z } from "zod";

export const timelineSchema = z
  .object({
    openStartDate: z.coerce.date(),
    denoisingStartDate: z.coerce.date(),
    assesmentStartDate: z.coerce.date(),
    closeDate: z.coerce.date(),
  })
  .superRefine((schema, ctx) => {
    if (schema.openStartDate > schema.denoisingStartDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages.laterDate(
          "Open start date",
          "Denoising start date",
        ),
        path: ["denoisingStartDate"],
      });
    }
    if (schema.denoisingStartDate > schema.assesmentStartDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages.laterDate(
          "Denoising start date",
          "Assesment start date",
        ),
        path: ["assesmentStartDate"],
      });
    }
    if (schema.assesmentStartDate > schema.closeDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages.laterDate("Assesment start date", "Close date"),
        path: ["closeDate"],
      });
    }
    return schema;
  });

export type TimelineSchema = z.infer<typeof timelineSchema>;
