import { errorMessages } from "@/constants/errorMessages";
import { z } from "zod";

export const timelineSchema = z.object({
  openStartDate: z.coerce.date(),
  denoisingStartDate: z.coerce.date(),
  assesmentStartDate: z.coerce.date(),
  closeDate: z.coerce.date(),
});

export const sequentTimelineSchema = timelineSchema
  .refine((schema) => schema.denoisingStartDate > schema.openStartDate, {
    message: errorMessages.laterDate("Denoising start date", "Open start date"),
    path: ["denoisingStartDate"],
  })
  .refine((schema) => schema.assesmentStartDate > schema.denoisingStartDate, {
    message: errorMessages.laterDate(
      "Assesment start date",
      "Denoising start date",
    ),
    path: ["assesmentStartDate"],
  })
  .refine((schema) => schema.closeDate > schema.assesmentStartDate, {
    message: errorMessages.laterDate("Close date", "Assesment start date"),
    path: ["closeDate"],
  });

export type timelineSchema = z.infer<typeof timelineSchema>;
