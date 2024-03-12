import type { Meta, StoryObj } from "@storybook/react";

import { RedoArrowIcon } from "@/components/icons/redoArrowIcon";

const meta = {
  title: "Icons/RedoArrowIcon",
  component: RedoArrowIcon,
} satisfies Meta<typeof RedoArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
