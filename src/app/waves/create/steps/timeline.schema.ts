import { z } from "zod";

export const timelineSchema = z.object({
  openStartDate: z.coerce.date(),
  denoisingStartDate: z.coerce.date(),
  assesmentStartDate: z.coerce.date(),
  closeDate: z.coerce.date(),
});

export type timelineSchema = z.infer<typeof timelineSchema>;
