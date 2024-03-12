import type { Meta, StoryObj } from "@storybook/react";

import { NumberListIcon } from "@/components/icons/numberListIcon";

const meta = {
  title: "Icons/NumberListIcon",
  component: NumberListIcon,
} satisfies Meta<typeof NumberListIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
