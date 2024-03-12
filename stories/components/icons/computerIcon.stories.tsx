import type { Meta, StoryObj } from "@storybook/react";

import { ComputerIcon } from "@/components/icons/computerIcon";

const meta = {
  title: "Icons/ComputerIcon",
  component: ComputerIcon,
} satisfies Meta<typeof ComputerIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
