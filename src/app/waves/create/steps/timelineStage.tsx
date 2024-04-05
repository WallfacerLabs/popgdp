import { canPerformActionByStage, type UserAction } from "@/config/waveStages";
import { cn } from "@/lib/cn";
import { AvailabilityIndicator } from "@/components/ui/availabilityIndicator";

import { CalendarField, CalendarFieldProps } from "./calendarField";

interface TimelineStageProps extends CalendarFieldProps {
  className?: string;
}

export const TimelineStage = ({
  name,
  control,
  label,
  stage,
  className,
}: TimelineStageProps) => {
  return (
    <div className={cn("border-l p-6", className)}>
      <CalendarField
        control={control}
        name={name}
        stage={stage}
        label={label}
      />
      <ActionsList stage={stage} />
    </div>
  );
};

type ActionsListProps = Pick<TimelineStageProps, "stage">;

function ActionsList({ stage }: ActionsListProps) {
  function canPerformAction(action: UserAction) {
    return canPerformActionByStage(stage, action);
  }

  return (
    <ul className="mt-4 flex flex-col gap-2">
      <li>
        <AvailabilityIndicator available={canPerformAction("submissionAdd")}>
          Add submission
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("submissionEdit")}>
          Edit submission
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("submissionSpam")}>
          Set submission as spam
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("commentAdd")}>
          Comments
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("commentValue")}>
          Rate comments
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("submissionVote")}>
          Voting
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("submissionVote")}>
          Submission rating
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("reviewAdd")}>
          Reviewing
        </AvailabilityIndicator>
        <AvailabilityIndicator available={canPerformAction("reviewAdd")}>
          Rate reviews
        </AvailabilityIndicator>
      </li>
    </ul>
  );
}
