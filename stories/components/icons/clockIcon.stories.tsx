import type { Meta, StoryObj } from "@storybook/react";

import { ClockIcon } from "@/components/icons/clockIcon";

const meta = {
  title: "Icons/ClockIcon",
  component: ClockIcon,
} satisfies Meta<typeof ClockIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
