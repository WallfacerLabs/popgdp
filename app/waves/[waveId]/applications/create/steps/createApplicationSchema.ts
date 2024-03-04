import { z } from "zod";

export const createApplicationSchema = z.object({
  projectName: z.string(),
  projectEntity: z.string(),
  projectDuration: z.string(),
  projectBudget: z.string(),
  summary: z.string(),
});
export type createApplicationSchema = z.infer<typeof createApplicationSchema>;
