import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";

interface TimelineStageProps {
  name: string;
  startDate: Date;
  endDate?: Date;
}

export const TimelineStage = ({
  name,
  startDate,
  endDate,
}: TimelineStageProps) => {
  const isCurrent = endDate && startDate < new Date() && endDate >= new Date();

  return (
    <li
      className={timelineStageVariants({ current: isCurrent })}
      data-current={isCurrent}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h4 className="text-sm font-bold leading-6">{name}</h4>
          {isCurrent && (
            <Badge className="-mr-4 ml-auto rounded-r-none">
              Current phase
            </Badge>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(startDate)}
          {endDate && <>-{formatDate(endDate)}</>}
        </span>
      </div>
    </li>
  );
};

const timelineStageVariants = cva(
  cn(
    "peer flex-grow border-t border-b px-4 pb-3 pt-2",
    "first:border-l last:border-r",
    "[&+&]:border-l peer-data-[current=true]:border-l-green",
    "first:rounded-l-3xl last:rounded-r-3xl",
  ),
  {
    variants: {
      current: {
        true: "border-green",
        false: "",
      },
    },
    defaultVariants: {
      current: false,
    },
  },
);
