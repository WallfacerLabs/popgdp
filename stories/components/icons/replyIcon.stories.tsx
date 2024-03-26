import type { Meta, StoryObj } from "@storybook/react";

import { ReplyIcon } from "@/components/icons/replyIcon";

const meta = {
  title: "Icons/ReplyIcon",
  component: ReplyIcon,
} satisfies Meta<typeof ReplyIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
