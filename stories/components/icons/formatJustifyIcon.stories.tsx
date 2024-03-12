import type { Meta, StoryObj } from "@storybook/react";

import { FormatJustifyIcon } from "@/components/icons/formatJustifyIcon";

const meta = {
  title: "Icons/FormatJustifyIcon",
  component: FormatJustifyIcon,
} satisfies Meta<typeof FormatJustifyIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
