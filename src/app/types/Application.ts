import { getWaveWithApplications } from "@/drizzle/queries/waves";

type PromiseType<T extends Promise<any>> =
  T extends Promise<infer U> ? U : never;
type WaveType = Exclude<
  PromiseType<ReturnType<typeof getWaveWithApplications>>,
  undefined
>;
export type Application = WaveType["applications"][number];
