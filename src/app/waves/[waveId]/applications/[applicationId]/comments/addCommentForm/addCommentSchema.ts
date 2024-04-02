import { errorMessages } from "@/constants/errorMessages";
import { z } from "zod";

export const addCommentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: errorMessages.nonEmptyString("Comment") }),
});

export type AddCommentSchema = z.infer<typeof addCommentSchema>;
