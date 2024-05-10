import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { parseWaveParams } from "@/lib/paramsValidation";
import { PageHeader } from "@/components/ui/pageHeader";
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

export default async function Wave({ params }: { params: unknown }) {
  const { waveId } = parseWaveParams(params);

  const wave = await getWaveWithApplications(waveId);

  if (!wave) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={wave.name} />

      <WaveBanner />

      <TimelinePreview wave={wave} />

      <SubmissionsSection wave={wave} />
    </div>
  );
}
