import type { Meta, StoryObj } from "@storybook/react";

import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

const meta = {
  title: "Icons/ThumbUpIcon",
  component: ThumbUpIcon,
} satisfies Meta<typeof ThumbUpIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
