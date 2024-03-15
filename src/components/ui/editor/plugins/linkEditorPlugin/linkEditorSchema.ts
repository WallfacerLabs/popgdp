import { errorMessages } from "@/constants/errorMessages";
import { URL_REGEXP } from "@/constants/regExps";
import { z } from "zod";

export const editorLinkSchema = z.object({
  linkText: z.string(),
  linkUrl: z.string().regex(URL_REGEXP, { message: errorMessages.invalidUrl }),
});

export type EditorLinkSchemaType = z.infer<typeof editorLinkSchema>;
