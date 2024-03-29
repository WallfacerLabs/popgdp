import { type userSchema } from "@/constants/validationSchemas";
import { type z } from "zod";

export type UserId = z.infer<typeof userSchema>["sid"];
