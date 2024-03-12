import type { Meta, StoryObj } from "@storybook/react";

import { DropArrowIcon } from "@/components/icons/dropArrowIcon";

const meta = {
  title: "Icons/DropArrowIcon",
  component: DropArrowIcon,
} satisfies Meta<typeof DropArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
