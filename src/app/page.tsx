import { getFirstNotClosedWave } from "@/drizzle/queries/waves";

import { PageHeader } from "@/components/ui/pageHeader";
import { TimelinePreview } from "@/components/ui/wavesTimelinePreview/timelinePreview";

import { SubmissionsSection } from "./waves/[waveId]/applications/submissions/submissionsSection";
import { WaveBanner } from "./waves/[waveId]/waveBanner";

export default async function Home() {
  const wave = await getFirstNotClosedWave();
  if (!wave) {
    return <NotWaveMessage />;
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

function NotWaveMessage() {
  return (
    <div className="my-[25vh] flex flex-col items-center">
      <h2 className="text-xl">No wave has been started yet</h2>
    </div>
  );
}
