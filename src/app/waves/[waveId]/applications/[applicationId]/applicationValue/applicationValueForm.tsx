import { getApplicationValue } from "@/drizzle/queries/applicationValues";

import { ApplicationWithComments } from "@/types/Application";
import { ContentValue } from "@/types/ContentValue";
import { canRateApplication } from "@/config/actionPermissions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { applicationValueAction } from "./applicationValueAction";

interface ApplicationValueFormProps {
  application: ApplicationWithComments;
}

export async function ApplicationValueForm({
  application,
}: ApplicationValueFormProps) {
  return (
    <form className="flex gap-4">
      <ActionButton application={application} value="spam" />
      <ActionButton application={application} value="positive" />
    </form>
  );
}

interface ActionButtonProps {
  application: ApplicationWithComments;
  value: ContentValue;
}

async function ActionButton({ application, value }: ActionButtonProps) {
  const { userId, validationErrorMessage } = await canRateApplication({
    creatorId: application.userId,
    waveId: application.waveId,
  });

  const applicationValue = await getApplicationValue({
    applicationId: application.id,
    userId,
  });

  const isChecked = applicationValue === value;

  const { text, variant } = isChecked
    ? buttonsConfig[value].true
    : buttonsConfig[value].false;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          disabled={!!validationErrorMessage}
          formAction={async () => {
            "use server";
            await applicationValueAction({
              application,
              isChecked,
              value,
            });
          }}
        >
          {text}
        </Button>
      </TooltipTrigger>
      {validationErrorMessage && (
        <TooltipContent align="end">{validationErrorMessage}</TooltipContent>
      )}
    </Tooltip>
  );
}

const buttonsConfig = {
  spam: {
    true: {
      text: "Marked as SPAM",
      variant: "secondary",
    },
    false: {
      text: "Report SPAM",
      variant: "outline",
    },
  },
  positive: {
    true: {
      text: "Upvoted",
      variant: "secondary",
    },
    false: {
      text: "Upvote",
      variant: "primary",
    },
  },
} as const;
