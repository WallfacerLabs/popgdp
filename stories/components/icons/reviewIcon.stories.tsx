import type { Meta, StoryObj } from "@storybook/react";

import { ReviewIcon } from "@/components/icons/reviewIcon";

const meta = {
  title: "Icons/ReviewIcon",
  component: ReviewIcon,
} satisfies Meta<typeof ReviewIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
