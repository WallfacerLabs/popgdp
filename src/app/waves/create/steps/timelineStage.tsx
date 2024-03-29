import { cn } from "@/lib/cn";

import { CalendarField, CalendarFieldProps } from "./calendarField";

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
    </div>
  );
};
