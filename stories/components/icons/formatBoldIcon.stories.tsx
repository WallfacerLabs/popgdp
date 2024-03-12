import type { Meta, StoryObj } from "@storybook/react";

import { FormatBoldIcon } from "@/components/icons/formatBoldIcon";

const meta = {
  title: "Icons/FormatBoldIcon",
  component: FormatBoldIcon,
} satisfies Meta<typeof FormatBoldIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
