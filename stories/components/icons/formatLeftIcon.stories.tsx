import type { Meta, StoryObj } from "@storybook/react";

import { FormatLeftIcon } from "@/components/icons/formatLeftIcon";

const meta = {
  title: "Icons/FormatLeftIcon",
  component: FormatLeftIcon,
} satisfies Meta<typeof FormatLeftIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
