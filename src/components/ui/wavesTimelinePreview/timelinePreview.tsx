import { Wave } from "@/types/Wave";
import { getWaveStage } from "@/config/waveStages";
import { cn } from "@/lib/cn";
import { formatTime } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";

import { TimelineStage } from "./timelineStage";

interface TimelinePreviewProps {
  wave: Wave;
  className?: string;
}

export const TimelinePreview = ({ wave, className }: TimelinePreviewProps) => {
  const { openStartDate, denoisingStartDate, assesmentStartDate, closeDate } =
    wave;

  const { waveStage, nextStageDate } = getWaveStage(wave);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {nextStageDate && (
        <Badge className="px-4 font-mono">
          {`${
            waveStage === "notOpen"
              ? "Wave will start at"
              : "Next stage will start at"
          } ${formatTime(nextStageDate)}`}
        </Badge>
      )}
      <ul className="flex w-full rounded-3xl  ">
        <TimelineStage
          name="open"
          currentStage={waveStage}
          startDate={openStartDate}
          endDate={denoisingStartDate}
        />
        <TimelineStage
          name="denoising"
          currentStage={waveStage}
          startDate={denoisingStartDate}
          endDate={assesmentStartDate}
        />
        <TimelineStage
          name="assesment"
          currentStage={waveStage}
          startDate={assesmentStartDate}
          endDate={closeDate}
        />
        <TimelineStage
          name="close"
          currentStage={waveStage}
          startDate={closeDate}
        />
      </ul>
    </div>
  );
};
