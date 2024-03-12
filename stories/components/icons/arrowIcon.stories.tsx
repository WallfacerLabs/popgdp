import type { Meta, StoryObj } from "@storybook/react";

import { ArrowIcon } from "@/components/icons/arrowIcon";

const meta = {
  title: "Icons/ArrowIcon",
  component: ArrowIcon,
} satisfies Meta<typeof ArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
