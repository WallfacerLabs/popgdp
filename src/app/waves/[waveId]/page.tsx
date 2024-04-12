import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { parseWaveParams } from "@/lib/paramsValidation";
import { TimelinePreview } from "@/components/ui/wavesTimelinePreview/timelinePreview";

import { SubmissionsSection } from "./applications/submissions/submissionsSection";
import { WaveBanner } from "./waveBanner";

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  const { waveId } = parseWaveParams(params);
  const wave = await getWaveWithApplications(waveId);
  if (!wave) {
    return {
      title: "Wave",
    };
  }
  return {
    title: wave.name,
  };
}

export default async function Wave({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const { waveId } = parseWaveParams(params);

  const wave = await getWaveWithApplications(waveId);

  if (!wave) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <WaveBanner />

      <TimelinePreview wave={wave} />

      <SubmissionsSection wave={wave} searchParams={searchParams} />
    </div>
  );
}
