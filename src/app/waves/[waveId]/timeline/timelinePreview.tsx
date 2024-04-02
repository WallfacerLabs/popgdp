import { Wave } from "@/types/Wave";
import { cn } from "@/lib/cn";

import { TimelineStage } from "./timelineStage";

interface TimelinePreviewProps {
  wave: Wave;
  className?: string;
}

export const TimelinePreview = ({ wave, className }: TimelinePreviewProps) => {
  const {
    name,
    openStartDate,
    denoisingStartDate,
    assesmentStartDate,
    closeDate,
  } = wave;

  return (
    <ul className={cn("flex rounded-3xl", className)}>
      <TimelineStage
        name="Open"
        startDate={openStartDate}
        endDate={denoisingStartDate}
      />
      <TimelineStage
        name="Denoising"
        startDate={denoisingStartDate}
        endDate={assesmentStartDate}
      />
      <TimelineStage
        name="Assesment"
        startDate={assesmentStartDate}
        endDate={closeDate}
      />
      <TimelineStage name="Close" startDate={closeDate} />
    </ul>
  );
};
