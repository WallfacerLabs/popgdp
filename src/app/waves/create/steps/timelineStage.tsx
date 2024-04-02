import { cn } from "@/lib/cn";
import { AvailabilityIndicator } from "@/components/ui/availabilityIndicator";

import { CalendarField, CalendarFieldProps } from "./calendarField";
import { TimelineSchema } from "./timeline.schema";

interface TimelineStageProps extends CalendarFieldProps {
  className?: string;
}

export const TimelineStage = ({
  name,
  control,
  label,
  title,
  className,
}: TimelineStageProps) => {
  return (
    <div className={cn("border-l p-6", className)}>
      <CalendarField
        control={control}
        name={name}
        title={title}
        label={label}
      />
      <ul className="mt-4 flex flex-col gap-2">
        {Object.entries(fieldActions[name]).map(([action, available]) => (
          <li key={action}>
            <AvailabilityIndicator available={available}>
              {action}
            </AvailabilityIndicator>
          </li>
        ))}
      </ul>
    </div>
  );
};

type FieldActions = {
  [K in keyof TimelineSchema]: {
    Comments: boolean;
    "Submission edit": boolean;
    Voting: boolean;
    Reviewing: boolean;
    "Submission rating": boolean;
    "Comments rating": boolean;
    "Reviews rating": boolean;
  };
};

const fieldActions: FieldActions = {
  openStartDate: {
    Comments: true,
    "Submission edit": true,
    Voting: false,
    Reviewing: false,
    "Submission rating": true,
    "Comments rating": true,
    "Reviews rating": false,
  },
  denoisingStartDate: {
    Comments: true,
    "Submission edit": true,
    Voting: false,
    Reviewing: false,
    "Submission rating": true,
    "Comments rating": true,
    "Reviews rating": false,
  },
  assesmentStartDate: {
    Comments: true,
    "Submission edit": false,
    Voting: true,
    Reviewing: true,
    "Submission rating": true,
    "Comments rating": true,
    "Reviews rating": true,
  },
  closeDate: {
    Comments: false,
    "Submission edit": false,
    Voting: false,
    Reviewing: false,
    "Submission rating": false,
    "Comments rating": false,
    "Reviews rating": false,
  },
};
