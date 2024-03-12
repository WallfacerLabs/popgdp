import type { Meta, StoryObj } from "@storybook/react";

import { AddCommentIcon } from "@/components/icons/addCommentIcon";

const meta = {
  title: "Icons/AddCommentIcon",
  component: AddCommentIcon,
} satisfies Meta<typeof AddCommentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
