import type { Meta, StoryObj } from "@storybook/react";

import { DotsHorizontalIcon } from "@/components/icons/dotsHorizontalIcon";

const meta = {
  title: "Icons/DotsHorizontalIcon",
  component: DotsHorizontalIcon,
} satisfies Meta<typeof DotsHorizontalIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
