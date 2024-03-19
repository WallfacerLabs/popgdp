import type { Meta, StoryObj } from "@storybook/react";

import { DotsVerticalIcon } from "@/components/icons/dotsVerticalIcon";

const meta = {
  title: "Icons/DotsVerticalIcon",
  component: DotsVerticalIcon,
} satisfies Meta<typeof DotsVerticalIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
