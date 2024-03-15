import { errorMessages } from "@/constants/errorMessages";
import { z } from "zod";

export const createWaveSchema = z.object({
  waveName: z
    .string()
    .min(3, { message: errorMessages.minLength("Wave name", 3) })
    .max(50, { message: errorMessages.maxLength("Wave name", 50) }),
  duration: z.object({
    from: z.date({ required_error: errorMessages.required("Start date") }),
    to: z.date({ required_error: errorMessages.required("End date") }),
  }),
});

export type createWaveSchema = z.infer<typeof createWaveSchema>;
