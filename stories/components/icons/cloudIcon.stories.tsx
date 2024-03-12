import type { Meta, StoryObj } from "@storybook/react";

import { CloudIcon } from "@/components/icons/cloudIcon";

const meta = {
  title: "Icons/CloudIcon",
  component: CloudIcon,
} satisfies Meta<typeof CloudIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
