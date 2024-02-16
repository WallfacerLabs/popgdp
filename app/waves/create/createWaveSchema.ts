import { z } from "zod";

export const createWaveSchema = z.object({
  waveName: z
    .string({ required_error: "Wave name is required" })
    .min(3, { message: "Wave name must be at least 3 characters long" })
    .max(50, { message: "Wave name must be at most 50 characters long" }),
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type createWaveSchema = z.infer<typeof createWaveSchema>;
