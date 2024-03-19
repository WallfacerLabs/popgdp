import type { Meta, StoryObj } from "@storybook/react";

import { ProgressIcon } from "@/components/icons/progressIcon";

const meta = {
  title: "Icons/ProgressIcon",
  component: ProgressIcon,
} satisfies Meta<typeof ProgressIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
