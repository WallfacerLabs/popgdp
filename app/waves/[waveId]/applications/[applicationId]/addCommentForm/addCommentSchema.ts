import { z } from "zod";

export const addCommentSchema = z.object({
  comment: z.string(),
});

export type addCommentSchema = z.infer<typeof addCommentSchema>;
