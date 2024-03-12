import type { Meta, StoryObj } from "@storybook/react";

import { CrossIcon } from "@/components/icons/crossIcon";

const meta = {
  title: "Icons/CrossIcon",
  component: CrossIcon,
} satisfies Meta<typeof CrossIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
