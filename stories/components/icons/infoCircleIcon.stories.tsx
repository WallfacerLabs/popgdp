import type { Meta, StoryObj } from "@storybook/react";

import { InfoCircleIcon } from "@/components/icons/infoCircleIcon";

const meta = {
  title: "Icons/InfoCircleIcon",
  component: InfoCircleIcon,
} satisfies Meta<typeof InfoCircleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
