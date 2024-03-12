import type { Meta, StoryObj } from "@storybook/react";

import { FormatRightIcon } from "@/components/icons/formatRightIcon";

const meta = {
  title: "Icons/FormatRightIcon",
  component: FormatRightIcon,
} satisfies Meta<typeof FormatRightIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
