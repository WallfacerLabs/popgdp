import type { Meta, StoryObj } from "@storybook/react";

import { ChevronIcon } from "@/components/icons/chevronIcon";

const meta = {
  title: "Icons/ChevronIcon",
  component: ChevronIcon,
} satisfies Meta<typeof ChevronIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
