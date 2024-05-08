import { errorMessages } from "@/constants/errorMessages";
import { z } from "zod";

export const addCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: errorMessages.nonEmptyString("Comment") }),
});

export type AddCommentSchema = z.infer<typeof addCommentSchema>;
