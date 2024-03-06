import { useParams } from "next/navigation";
import { z } from "zod";

const waveParamsSchema = z.object({
  waveId: z.coerce.number(),
});

export function parseWaveParams(params: unknown) {
  return waveParamsSchema.parse(params);
}

const applicationParamsSchema = waveParamsSchema.extend({
  applicationId: z.coerce.number(),
});

export function parseApplicationParams(params: unknown) {
  return applicationParamsSchema.parse(params);
}

export function useApplicationParams() {
  return parseApplicationParams(useParams());
}
