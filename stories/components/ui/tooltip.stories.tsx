import type { Meta, StoryObj } from "@storybook/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircleIcon } from "@/components/icons/infoCircleIcon";

const meta = {
  title: "UI/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoCircleIcon className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export { Default };
