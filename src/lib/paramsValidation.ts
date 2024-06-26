import { notFound } from "next/navigation";
import { z } from "zod";

function parseParams<T extends z.ZodTypeAny>(
  schema: T,
  params: unknown,
): T["_output"] {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw notFound();
  }
  return result.data;
}

const waveParamsSchema = z.object({
  waveId: z.coerce.number(),
});

export type WaveParamsSchema = z.infer<typeof waveParamsSchema>;

export function parseWaveParams(params: unknown) {
  return parseParams(waveParamsSchema, params);
}

const applicationParamsSchema = waveParamsSchema.extend({
  applicationId: z.string(),
});

export type ApplicationParamsSchema = z.infer<typeof applicationParamsSchema>;

export function parseApplicationParams(params: unknown) {
  return parseParams(applicationParamsSchema, params);
}

const imageParamsSchema = z.object({
  imageId: z.string(),
});

export type ImageParamsSchema = z.infer<typeof imageParamsSchema>;

export function parseImageParams(params: unknown) {
  return parseParams(imageParamsSchema, params);
}
