import { cva } from "class-variance-authority";

import { type WaveStage } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";

interface TimelineStageProps {
  name: WaveStage;
  currentStage: WaveStage;
  startDate: Date;
  endDate?: Date;
}

export const TimelineStage = ({
  name,
  currentStage,
  startDate,
  endDate,
}: TimelineStageProps) => {
  const isCurrent = name === currentStage;

  return (
    <li
      className={timelineStageVariants({ isCurrent })}
      data-current={isCurrent}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h4 className="text-sm font-bold capitalize leading-6">{name}</h4>
          {isCurrent && (
            <Badge className="-mr-4 ml-auto rounded-r-none">
              Current phase
            </Badge>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(startDate)}
          {endDate && <> - {formatDate(endDate)}</>}
        </span>
      </div>
    </li>
  );
};

const timelineStageVariants = cva(
  cn(
    "flex-grow border border px-4 pb-3 pt-2 overflow-hidden",
    "first:rounded-l-3xl last:rounded-r-3xl",
    "bg-background",
  ),
  {
    variants: {
      isCurrent: {
        true: "border-green",
        false: "",
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  },
);
