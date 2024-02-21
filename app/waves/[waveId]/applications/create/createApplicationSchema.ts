import { z } from "zod";

export const createApplicationSchema = z.object({
  projectName: z.string(),
  description: z.string(),
});
export type createApplicationSchema = z.infer<typeof createApplicationSchema>;
