import type { Meta, StoryObj } from "@storybook/react";

import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";

const meta = {
  title: "Icons/ErrorCircleIcon",
  component: ErrorCircleIcon,
} satisfies Meta<typeof ErrorCircleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
