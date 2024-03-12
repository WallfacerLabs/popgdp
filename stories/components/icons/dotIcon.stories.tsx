import type { Meta, StoryObj } from "@storybook/react";

import { DotIcon } from "@/components/icons/dotIcon";

const meta = {
  title: "Icons/DotIcon",
  component: DotIcon,
} satisfies Meta<typeof DotIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
