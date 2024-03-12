import type { Meta, StoryObj } from "@storybook/react";

import { CheckIcon } from "@/components/icons/checkIcon";

const meta = {
  title: "Icons/CheckIcon",
  component: CheckIcon,
} satisfies Meta<typeof CheckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
