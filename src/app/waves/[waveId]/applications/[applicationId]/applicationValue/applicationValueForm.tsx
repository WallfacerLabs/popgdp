import { getApplicationValue } from "@/drizzle/queries/applicationValues";

import { ApplicationWithComments } from "@/types/Application";
import { ContentValue } from "@/types/ContentValue";
import { canRateApplication } from "@/config/actionPermissions";
import { Button } from "@/components/ui/button";
import { ErrorTooltip } from "@/components/ui/tooltip";

import { applicationValueAction } from "./applicationValueAction";

interface ApplicationValueFormProps {
  application: ApplicationWithComments;
}

export async function ApplicationValueForm({
  application,
}: ApplicationValueFormProps) {
  return (
    <form className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <ActionButton application={application} value="invalid" />
      <ActionButton application={application} value="positive" />
    </form>
  );
}

interface ActionButtonProps {
  application: ApplicationWithComments;
  value: ContentValue;
}

async function ActionButton({ application, value }: ActionButtonProps) {
  const { userId, validationErrorMessage } = await canRateApplication(
    application.id,
  );

  const applicationValue = await getApplicationValue({
    applicationId: application.id,
    userId,
  });

  const isChecked = applicationValue === value;

  const { text, variant } = isChecked
    ? buttonsConfig[value].true
    : buttonsConfig[value].false;

  return (
    <ErrorTooltip message={validationErrorMessage}>
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
    </ErrorTooltip>
  );
}

const buttonsConfig = {
  invalid: {
    true: {
      text: "Marked as invalid",
      variant: "secondary",
    },
    false: {
      text: "Report invalid",
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
