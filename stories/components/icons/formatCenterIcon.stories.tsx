import type { Meta, StoryObj } from "@storybook/react";

import { FormatCenterIcon } from "@/components/icons/formatCenterIcon";

const meta = {
  title: "Icons/FormatCenterIcon",
  component: FormatCenterIcon,
} satisfies Meta<typeof FormatCenterIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
